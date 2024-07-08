//商品建檔 (欄位定義檔)
export interface MerchantUnit{
    no: string,                 //商品編號
    name: string,               //商品名稱
    unit: string,               //單位
    cash: number,               //面額
    avalibleDate: number,       //有效天數
    serialNo: string,           //序號管理
}