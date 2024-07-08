//票券商品建檔 (欄位定義檔)
export interface TicketUnit{
    no: string,                     //商品編號
    property: string,               //商品屬性
    category: string,               //類別
    name: string,                   //商品名稱
    unit: string,                   //發行單位
    serialManagement: string,       //序號管理
    avalibleDate: number,           //有效天數
    gaphic: string,                 //圖檔
    cash: number,                   //面額
    tax: string,                    //售價稅別
    etc: string,                    //備註
}