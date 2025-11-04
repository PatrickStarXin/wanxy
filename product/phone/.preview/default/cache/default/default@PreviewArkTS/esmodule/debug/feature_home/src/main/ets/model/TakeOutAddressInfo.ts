export class TakeOutAddressInfo {
    name: string = "";
    sex?: boolean;
    phone: string = "";
    address?: string;
    addressDetail: string = "";
    label: string = "";
    isDefault: boolean = false;
}
export const AddressInfos: TakeOutAddressInfo[] = [
    {
        "name": "张三",
        "sex": true,
        "phone": "180xxxx1234",
        "address": "",
        "addressDetail": "华为南京研究所N15",
        "label": "公司",
        "isDefault": true
    },
    {
        "name": "张三",
        "sex": true,
        "phone": "180xxxx1234",
        "address": "",
        "addressDetail": "华为南京研究所N99",
        "label": "家",
        "isDefault": true
    }
];
