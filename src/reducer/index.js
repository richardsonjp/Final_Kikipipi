import { combineReducers } from "../../node_modules/redux";
import loginname from "./loginname";
import userid from "./userid";
import invoice from "./invoice"
import admin from "./admin"
// ini isi nya state semua

export default combineReducers({
    displaylogin: loginname,
    iduser: userid,
    invoice: invoice,
    admin: admin
})