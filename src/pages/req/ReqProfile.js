import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { PROFILE } from "../../utils/Firebase";
import { Link } from 'react-router-dom';
import routes from "../../utils/Routes";

export function reqProfileDatas(list, id, setDataList) {
  const res = list.reduce((acc0, data, idx) => {
    const reduce = Object.entries(data).reduce((acc, [key, val], i) => {
      // // console.log("KEY", key, "\nval", val, "\nacc", acc);
      if(key === 'pubDate' || key === 'filenames' || key === 'year' || key === 'name' || key === 'phoneNum' || key === 'birthdate' || key === 'email' || key === 'company' || key === 'check' || key === 'modifiedDate') {
        acc = {
          ...acc,
          [key]: val
        }
      }
      return acc;
    }, { 'id': id[idx] })
    return acc0.concat(reduce);
  }, []);
  setDataList(cur => cur.concat([res]));
  return res;
}

export const reqProfileTableDatas = (dataList, checkList, checkEach) => (
  dataList.map((obj, i) => {
    if (obj) {
      const {
        id,
        year,
        name,
        phoneNum,
        birthdate,
        email,
        company,
        check,
        modifiedDate,
        pubDate,
        filenames,
      } = obj
      // // console.log("IDDDD", id);
      return(
        <tr key={i}>
          <td style={{width: '2%'}}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)}/>
          </td>
          <td><Link to={routes.reqProfileDetail(id)}>{name}</Link></td>
          <td><Link to={routes.reqProfileDetail(id)}>{year}</Link></td>
          <td><Link to={routes.reqProfileDetail(id)}>{birthdate}</Link></td>
          <td><Link to={routes.reqProfileDetail(id)}>{phoneNum}</Link></td>
          <td><Link to={routes.reqProfileDetail(id)}>{email}</Link></td>
          <td><Link to={routes.reqProfileDetail(id)}>{company}</Link></td>
          <td style={{width: "7%"}}><Link to={routes.reqProfileDetail(id)}>{check}</Link></td>
          <td><Link to={routes.reqProfileDetail(id)}>{modifiedDate}</Link></td>
          <td><Link to={routes.reqProfileDetail(id)}>{pubDate}</Link></td>
        </tr>
      )
    }
  })
)

// export default function ReqProfile() {
//   const [loading, setLoading] = useState(false);
//   const [dataList, setDataList] = useState([]);
//   const [search, setSearch] = useState('');

//   const header = [
//     '??????',
//     '??????',
//     '????????????',
//     '????????????',
//     '?????????',
//     '?????????',
//     '??????????????????',
//     '????????????',
//     '????????????',
//   ]
//   useEffect(() => {
//     // ????????? ????????????
//     // const a = [1,2,3,4,5,6,7,8,1,];
//     // a.map(() => {PROFILE.add({pubDate: "2022-05-21 10:11", modifiedDate: "2022-02-11 10:10", year: "??????", name: "??????", birthdate: "20220505", phoneNum: "01012341234", email: "test@naver.com", company: "?????????", department: "??????????????????", comPosition: "??????", comTel: "022332323", comAdr: "????????? ???????????????", faxNum: "1234213", sector: "it", check: "X"}) });
//     let list = []
//     let id = []
//     PROFILE.where("check", "==", "X").orderBy("modifiedDate", "desc").get().then((docs) => {
//       docs.forEach((doc) => {
//         if(doc.exists){
//           list.push(doc.data());
//           id.push(doc.id);
//         }
//       });
//       setLoading(true);
//       setDataList(list.reduce((acc0, data, idx) => {
//         let c = false;
//         const res = Object.entries(data).reduce((acc, [key, val], i) => {
//           if(!search || val.includes(search)){
//             c = true;
//           }
//           // // console.log("KEY", key, "\nval", val, "\nacc", acc);
//           if(key === 'pubDate' || key === 'filenames' || key === 'year' || key === 'name' || key === 'phoneNum' || key === 'birthdate' || key === 'email' || key === 'company' || key === 'check' || key === 'modifiedDate') {
//             acc = {
//               ...acc,
//               [key]: val
//             }
//           }
//           return acc;
//         }, {'id': id[idx]})
//         return c ? acc0.concat(res) : acc0;
//       }, []));
//     });
//   }, [search]);
  
//   if(loading){
//     // // console.log("table data", dataList);
    
//   }
  
//   return (
//     <>
//       {!loading && <div>Loading</div>}
//       {loading && <DataTable title={"????????? ??????"} header={header} tableDatas={tableDatas} dataList={dataList} search={search} setSearch={setSearch} collection={PROFILE}></DataTable>}
//     </>
//   );
// }
