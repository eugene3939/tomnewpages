//角色管理 (欄位定義檔)
export interface RoleUnit{
    role: string,           //角色代碼
    name: string,           //角色名稱
    unitNo: number,         //單位編號
    program_member: string, //程式項目 (管理)
    program: string,        //程式項目 (會員管理)
}