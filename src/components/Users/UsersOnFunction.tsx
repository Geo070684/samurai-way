// import React from "react"
import axios from "axios"
import s from "./Users.module.css"
import { UsersPropsType } from "./UsersContainer"
import avatar from "../../assets/images/avatar.png"

// export type UsersType = {
//   id: number;
//   photoUrl: string
//   foollowed: boolean;
//   fullName: string;
//   status: string;
//   message:string;
//   location: { city: string; contry: string };
// };

// const Users = (props: UsersPropsType) => {
//   const getUsers = () => {
//     if (props.users.length === 0) {
//       axios.get('https://social-network.samuraijs.com/api/1.0/users')
//         .then(res => {
//           props.setUsers(res.data.items)
//         })
//     }
    // props.setUsers([{
    //   id: 1,
    //   photoUrl: "data:image/jpeg;base64,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",
    //   foollowed: false,
    //   fullName: "Sveta",
    //   status: "boss",
    //   message: "Hello",
    //   location: { city: "Brest", contry: "Belarus" },
    // },
    // ]
    // )
  // }

//   return (<div>
//     <button onClick={getUsers}>Get Users</button>
//     {props.users.map(item => {
//       return <div key={item.id} className={s.wrapperItem}>
//         <div className={s.wrapperImageButton}>
//           <div className={s.wrapperImage}>
//             <img className={s.image} src={item.photos.small !== null ? item.photos.small : avatar} alt="img" />
//           </div>
//           <div>
//             {
//               item.followed
//                 ? <button onClick={() => props.unFollow(item.id)}> Unfollow</button>
//                 : <button onClick={() => props.follow(item.id)}> Follow </button>
//             }
//           </div>
//         </div>
//         <div className={s.wrapperDialog}>
//           <div className={s.wrapperName}>
//             <span>{item.name},  {item.status} </span>
//             <div className={s.text} >{item.uniqueUrlName}</div>
//           </div>
//           <div className={s.wrapperContry}>
//             <div>{"item.location.city"}, </div >
//             <div>{"item.location.contry"}</div>
//           </div>
//         </div>
//       </div>
//     })}
//   </div>)
// }

// export default Users