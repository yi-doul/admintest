import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { USER } from "../../utils/Firebase";
import { Link } from 'react-router-dom';
import routes from "../../utils/Routes";

export function reqUserDatas(list, id, setDataList) {
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

export const reqUserTableDatas = (dataList, checkList, checkEach) => (
  dataList.map((obj, i) => {
    if (obj) {
      const {
        id,
        filenames,
        year,
        name,
        phoneNum,
        birthdate,
        email,
        company,
        check,
        modifiedDate,
        pubDate
      } = obj
      // // console.log("IDDDD", id);
      return (
        <tr key={i}>
          <td style={{ width: '2%' }}>
            <input type="checkbox" onChange={(e) => checkEach(e, id, filenames)} checked={checkList.includes(id)} />
          </td>
          <td><Link to={routes.reqUserDetail(id)}>{name}</Link></td>
          <td><Link to={routes.reqUserDetail(id)}>{year}</Link></td>
          <td><Link to={routes.reqUserDetail(id)}>{birthdate}</Link></td>
          <td><Link to={routes.reqUserDetail(id)}>{phoneNum}</Link></td>
          <td><Link to={routes.reqUserDetail(id)}>{email}</Link></td>
          <td><Link to={routes.reqUserDetail(id)}>{company}</Link></td>
          <td style={{ width: '5%' }}><Link to={routes.reqUserDetail(id)}>{check}</Link></td>
          <td><Link to={routes.reqUserDetail(id)}>{modifiedDate}</Link></td>
          <td><Link to={routes.reqUserDetail(id)}>{pubDate}</Link></td>
        </tr>
      )
    }
  })
)

// export default function ReqUser() {
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
//     '????????????',
//     '????????????',
//     '????????????',
//   ]
//   useEffect(() => {
//     // ????????? ????????????
//     // const a = [1, 2, 3, 4, 5, 6, 7, 8, 1,];
//     // a.map(() => {
//     //   USER.add({
//     //     year: "??????",
//     //     name: "??????",
//     //     birthdate: "20220505", 
//     //     phoneNum: "01012341234", 
//     //     email: "test@naver.com", 
//     //     company: "?????????", 
//     //     department: "??????????????????", 
//     //     comPosition: "??????", 
//     //     comTel: "022332323", 
//     //     comAdr: "????????? ???????????????", 
//     //     faxNum: "1234213", 
//     //     sector: "it", 
//     //     check: "O",
//     //     pubDate: "202222222",
//     //     modifiedDate: "2022-02-11 10:10",
//     //   })
//     // });
//     let list = []
//     let id = []
//     USER.where("check", "==", "X").orderBy("modifiedDate", "desc").get().then((docs) => {
//       docs.forEach((doc) => {
//         if (doc.exists) {
//           list.push(doc.data());
//           id.push(doc.id);
//         }
//       });
//       setLoading(true);
//       setDataList(list.reduce((acc0, data, idx) => {
//         let c = false;
//         const res = Object.entries(data).reduce((acc, [key, val], i) => {
//           if (!search || val.includes(search)) {
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
//         }, { 'id': id[idx] })
//         return c ? acc0.concat(res) : acc0;
//       }, []));
//     });
//   }, [search]);

//   if (loading) {
//     // // console.log("table data", dataList);

//   }
  
//   return (
//     <>
//       {!loading && <div>Loading</div>}
//       {loading && <DataTable title={"??????"} header={header} tableDatas={tableDatas} dataList={dataList} search={search} setSearch={setSearch} collection={USER}></DataTable>}

//     </>
//   );
// }
