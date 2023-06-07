import s from "../Navbar/navbar.module.css";

 export const callBack = ((props: { isActive: boolean; isPending: boolean; }) => (props.isActive ? s.active : ''))