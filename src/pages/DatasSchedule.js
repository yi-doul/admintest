import react, { useState, useEffect, useRef } from "react";
import { Pagination, DataTable } from "../components/DataTable";
import { firestore, TEAM, SCHEDULE } from "../utils/Firebase";
import readXlsxFile from 'read-excel-file';
import { Link, useLocation } from 'react-router-dom';
import routes from "../utils/Routes";

export default function DatasSchedule() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [idList, setIdList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState('');

  const header = [
    '제목',
    '작성자',
    '내용',
    '수정시간',
  ]
  useEffect(() => {
    // 데이터 추가하기
    // const a = [1,2,3,4,5,6,7,8,9,1];
    // a.map(() => {SCHEDULE.add({modifiedDate: "2022-02-11 10:10", creator: "유저" , title: "기수", content: "내용ㅇㅇ"})})
    let list = []
    let id = []
    SCHEDULE.orderBy("modifiedDate", "desc").get().then((docs) => {
      docs.forEach((doc) => {
        if(doc.exists){
          list.push(doc.data());
          id.push(doc.id);
        }
      });
      setLoading(true);
      setIdList(id);
      setDataList(list.reduce((acc0, data, idx) => {
        let c = false;
        const res = Object.entries(data).reduce((acc, [key, val], i) => {
          if(!search || val.includes(search)){
            c = true;
          }
          // console.log("KEY", key, "\nval", val, "\nacc", acc);
          if(key === 'title' || key === 'content' || key === 'creator' || key === 'pubDate' || key === 'modifiedDate') {
            acc = {
              ...acc,
              [key]: val
            }
          }
          return acc;
        }, {id: id[idx]})
        return c ? acc0.concat(res) : acc0;
      }, []));
    });
  }, [search]);
  
  if(loading){
    console.log("table data", dataList);
  }
  const tableDatas = (dataList, checkList, checkEach) => (
    dataList.map((obj, i) => {
      if (obj) {
        const {
          id,
          title,
          content,
          creator,
          modifiedDate,
        } = obj
        console.log("IDDDD", id);
        return(
          <tr key={i}>
            <td>
              <input type="checkbox" onChange={(e) => checkEach(e, id)} checked={checkList.includes(id)}/>
            </td>
            <td><Link to={routes.datasNoticeDetail(id)}>{title}</Link></td>
            <td><Link to={routes.datasNoticeDetail(id)}>{creator}</Link></td>
            <td style={{width: '20%'}}><Link to={routes.datasNoticeDetail(id)}>{content && content.length > 20 ? `${content.slice(0,20)}...` : content}</Link></td>
            <td><Link to={routes.datasNoticeDetail(id)}>{modifiedDate}</Link></td>
          </tr>
        )
      }
    })
  )
  return (
    <>
      {!loading && <div>Loading</div>}
      {loading && <DataTable title={"일정"} header={header} tableDatas={tableDatas} dataList={dataList} search={search} setSearch={setSearch}></DataTable>}
    </>
    );
}
