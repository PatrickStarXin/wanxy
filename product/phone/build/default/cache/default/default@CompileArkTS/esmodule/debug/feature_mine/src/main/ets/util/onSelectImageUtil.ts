import photoAccessHelper from "@ohos:file.photoAccessHelper";
import util from "@ohos:util";
import type common from "@ohos:app.ability.common";
import fileIo from "@ohos:file.fs";
import fileUri from "@ohos:file.fileuri";
import hilog from "@ohos:hilog";
interface ImageSelectResult {
    originalUri: string;
    savedPath: string;
}
export default class onSelectImageUtil {
    // 静态方法，接收context参数
    /*  static async onSelectImage(context: common.Context): Promise<string> {
        try {
          // 创建照片选择器实例
          const photoViewPicker = new photoAccessHelper.PhotoViewPicker();
    
          // 调用select方法拉起图库界面
          const result = await photoViewPicker.select({
            maxSelectNumber: 1    // 限制选择一张照片
          });
          if (result.photoUris && result.photoUris.length > 0) {
            const selectedImageUri = result.photoUris[0];
            return await onSelectImageUtil.saveImageToSandbox(context,selectedImageUri);
          }
          return ""
        } catch (err) {
          console.error('选择图片失败: ' + JSON.stringify(err));
          return "";
        }
      }*/
    static async onSelectImage(context: common.Context): Promise<ImageSelectResult> {
        if (!context) {
            hilog.error(0x0000, 'AddFoodPage', '上下文未初始化，无法选择图片');
            return { originalUri: '', savedPath: '' };
        }
        // 直接使用选择器返回的uri进行实时预览
        try {
            // 创建照片选择器实例
            const photoViewPicker = new photoAccessHelper.PhotoViewPicker(); // 用于图片选择
            const result = await photoViewPicker.select({
                maxSelectNumber: 1 // 限制选择一张照片
            });
            hilog.info(0x0000, 'onSelectImage', `选择器返回结果: ${JSON.stringify(result)}`);
            if (result && result.photoUris && result.photoUris.length > 0) {
                const selectedUri = result.photoUris[0]; // 选择第一个选中的图片
                hilog.info(0x0000, 'AddFoodPage', `选择的图片URI: ${selectedUri}`);
                // 同时返回原始uri和保存后的路径
                const savedPath = await onSelectImageUtil.saveImageToSandbox(context, selectedUri);
                return { originalUri: selectedUri, savedPath: savedPath };
            }
            else {
                hilog.info(0x0000, 'onSelectImage', '用户取消选择图片');
                return { originalUri: '', savedPath: '' };
            }
        }
        catch (err) {
            hilog.error(0x0000, 'onSelectImage', '选择图片失败: ' + JSON.stringify(err));
            return { originalUri: '', savedPath: '' };
        }
    }
    // 只选择图片,不立即保存,用于实时预览
    static async selectImageOnly(): Promise<string> {
        try {
            const photoViewPicker = new photoAccessHelper.PhotoViewPicker();
            const result = await photoViewPicker.select({
                maxSelectNumber: 1
            });
            hilog.info(0x0000, 'selectImageOnly', `选择器返回结果: ${JSON.stringify(result)}`);
            if (result && result.photoUris && result.photoUris.length > 0) {
                const selectedUri = result.photoUris[0];
                hilog.info(0x0000, 'selectImageOnly', `选择的图片URI: ${selectedUri}`);
                return selectedUri;
            }
            return "";
        }
        catch (err) {
            hilog.error(0x0000, 'selectImageOnly', '选择图片失败: ' + JSON.stringify(err));
            return "";
        }
    }
    static async saveImageToSandbox(context: common.Context, uri: string): Promise<string> {
        try {
            // 生成唯一文件名
            const fileName = util.generateRandomUUID() + ".jpg";
            // 获取应用沙箱files目录路径
            const targetPath = context.filesDir + '/' + fileName;
            hilog.info(0x0000, 'onSelectImageUtil_saveImageToSandbox', `开始拷贝图片: ${uri} -> ${targetPath}`);
            //执行文件拷贝
            const sourceFile = fileIo.openSync(uri, fileIo.OpenMode.READ_ONLY);
            const targetFile = fileIo.openSync(targetPath, fileIo.OpenMode.CREATE | fileIo.OpenMode.READ_WRITE);
            fileIo.copyFileSync(sourceFile.fd, targetFile.fd);
            // 关闭文件
            fileIo.closeSync(sourceFile.fd);
            fileIo.closeSync(targetFile.fd);
            const isFileExist = fileIo.accessSync(targetPath);
            if (isFileExist) {
                hilog.info(0x0000, 'onSelectImageUtil', `图片已成功保存到: ${targetPath}`);
                /// return fileUri.getUriFromPath(targetPath);
                // 返回原始路径而不是fileUri，这样数据库保存的就是 /data/storage/... 格式
                return targetPath;
            }
            else {
                hilog.error(0x0000, 'onSelectImageUtil', `文件保存后验证失败: ${targetPath}`);
                return "";
            }
        }
        catch (err) {
            console.error('保存图片失败: ' + JSON.stringify(err));
            return "";
        }
    }
    /**
     * 获取图片数据源
     * 支持base64和resourse两种格式
     * 重复，后期改为通用接口
     */
    getImageSource(pic: string): Resource | string | PixelMap {
        if (!pic || pic.trim() === '') {
            hilog.info(0x0000, 'FoodCategory_getImageSource', '图片路径为空，使用默认图片');
            return { "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
        }
        // 如果是完整的文件路径
        if (pic.startsWith('/') || pic.startsWith('file://')) {
            hilog.info(0x0000, 'FoodCategory_getImageSource', `识别为文件路径: ${pic}`);
            try {
                // 检查文件是否存在
                const isFileExist = fileIo.accessSync(pic);
                if (isFileExist) {
                    hilog.info(0x0000, 'FoodCategory_getImageSource', `文件存在: ${pic}`);
                    // 使用 fileUri 来访问文件
                    return fileUri.getUriFromPath(pic);
                }
                else {
                    hilog.error(0x0000, 'FoodCategory_getImageSource', `文件不存在: ${pic}`);
                }
            }
            catch (err) {
                hilog.error(0x0000, 'FoodCategory_getImageSource', `文件访问失败: ${pic}, error: ${JSON.stringify(err)}`);
            }
            return { "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
        }
        // 如果是base64数据uri
        if (pic && pic.startsWith('data:image')) {
            hilog.info(0x0000, 'FoodCategory', '识别为base64图片');
            return pic;
        }
        // 如果是资源路径
        if (pic && pic.startsWith('app.media.')) {
            hilog.info(0x0000, 'FoodCategory', `识别为资源路径: ${pic}`);
            try {
                const resource = { "id": -1, "type": -1, params: [pic], "bundleName": "wanxy.food.com", "moduleName": "phone" };
                if (resource) {
                    return resource;
                }
            }
            catch (error) {
                hilog.error(0x0000, 'FoodCategory', `资源路径转换失败: ${pic}, error: ${JSON.stringify(error)}`);
            }
        }
        // 如果是文件名，没有路径分隔符
        if (pic && !pic.includes('/') && !pic.includes('\\')) {
            // 尝试构建完整路径
            try {
                const context = getContext(this) as common.Context;
                const fullPath = context.filesDir + '/' + pic;
                hilog.info(0x0000, 'FoodCategory', `构建完整文件路径: ${fullPath}`);
                return fullPath;
            }
            catch (err) {
                hilog.error(0x0000, 'FoodCategory', '构建图片路径失败: ' + JSON.stringify(err));
            }
        }
        // 返回一个展位图
        hilog.warn(0x0000, 'FoodCategory', `无法识别的图片路径格式: ${pic}`);
        return { "id": 134217790, "type": 20000, params: [], "bundleName": "wanxy.food.com", "moduleName": "phone" };
    }
}
