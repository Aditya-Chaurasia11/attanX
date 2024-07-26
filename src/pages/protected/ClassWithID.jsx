import { useParams } from "react-router-dom";
import axios from "axios";
// import { useEffect, useState } from "react";

// function ClassWithId() {
//   const { id } = useParams();

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [url, setUrl] = useState("");
//   const [student, setStudent] = useState([]);

//   const loadClass = async () => {
//     try {
//       console.log(id);
//       const token = localStorage.getItem("token");
//       const headers = {
//         "x-refresh-token": `Bearer ${token}`,
//       };
//       const res = await axios.get(
//         `https://nice-teal-hen-fez.cyclic.app/class/${id}`,
//         { headers }
//       );

//       setName(res.data.data.name);
//       setDescription(res.data.data.description);
//       setUrl(res.data.data.url);
//       console.log(res.data.data);

//       const res2 = await axios.get(
//         `https://nice-teal-hen-fez.cyclic.app/student?class=${id}`,
//         { headers }
//       );
//       setStudent(res2.data.data);
//       console.log(student);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //   const getAllStudentWithClassId = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       const headers = {
//   //         "x-refresh-token": `Bearer ${token}`,
//   //       };
//   //       const res = await axios.get(
//   //         `https://nice-teal-hen-fez.cyclic.app/student?class=${id}`,
//   //         { headers }
//   //       );
//   //       setStudent(res.data.data);
//   //       console.log(student);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };

//   useEffect(() => {
//     loadClass();
//     // getAllStudentWithClassId();
//   }, []);

//   return (
//     <>
//       <div className="classwithid_container px-24 py-12 ">
//         <div className="card card-side bg-base-100 shadow-xl h-40">
//           <figure className="w-1/3">
//             <img src={url} alt="Movie" />
//           </figure>
//           <div className="card-body ">
//             <h2 className="card-title">{name}</h2>
//             <p>{description}</p>
//           </div>
//         </div>

//         <table className="table w-full">
//           <thead>
//             <tr>
//               {/* <th>Name</th>

//                 <th></th> */}
//               <th>Name</th>
//               <th>Phone</th>
//               {/* <th>Class Link</th> */}
//               {/* // <th>Status</th>
//                 // <th>Assigned To</th> */}
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {student.map((l, k) => {
//               return (
//                 <tr key={k}>
//                   {/* <td>
//                       <div className="flex items-center space-x-3">
//                         <div className="avatar">
//                           <div className="mask mask-squircle w-12 h-12">
//                             <img src={l.url} alt="Avatar" />
//                           </div>
//                         </div>
//                         <div>
//                                                 <div className="font-bold">{l.first_name}</div>
//                                                 <div className="text-sm opacity-50">{l.last_name}</div>
//                                             </div>
//                       </div>
//                     </td> */}
//                   <td>{l.full_name}</td>
//                   {/* <td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
//                     <td>{getDummyStatus(k)}</td> */}
//                   <td>{l.phone_number}</td>
//                   {/* <td> */}
//                   {/* <button
//                         className="btn btn-square btn-ghost"
//                         onClick={() => goToClass(l._id)}
//                       >
//                         <TrashIcon className="w-5" />
//                       </button> */}
//                   {/* </td> */}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default ClassWithId;
import { showNotification } from "../../features/common/headerSlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import { openModal } from "../../features/common/modalSlice";

import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";

const TopSideButtons = ({
  removeFilter,
  applyFilter,
  applySearch,
  selectedClass,
  selectedId,
  loadClass,
}) => {
  const { id } = useParams();
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    console.log(id);
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const dispatch = useDispatch();

  // const openAddNewLeadModal = () => {
  //   dispatch(
  //     openModal({
  //       title: "Add New Lead",
  //       bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
  //     })
  //   );
  // };
  const getAllCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };

      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/class`, {
        headers,
      });
      setCategory(res.data.data);
      console.log("this is cate", category);
    } catch (error) {
      console.log(error);
    }
  };

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState(selectedId);
  const [additional, setAdditional] = useState("");
  const [category, setCategory] = useState([]);
  const [telegramID, setTelegramID] = useState("");

  const handleFormSubmit = async (e) => {
    const data = {
      full_name: username,
      phone_number: phone,
      class: value,
      telegram_id: telegramID,
      // additional: additional,
    };

    setAdditional("");
    setPhone("");
    setUsername("");
    setTelegramID("");
    console.log(data);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/student`,
        data,
        { headers }
      );
      showNotification({ message: "New Lead Added!", status: 1 });
      loadClass();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <SearchBar
        searchText={searchText}
        styleClass="mr-2"
        setSearchText={setSearchText}
      />
      <label htmlFor="my_modal_6" className="btn">
        Add Student
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Student</h3>
          <p className="py-4">
            <form>
              <input
                type="text"
                required
                placeholder="Enter student name"
                className="input input-bordered w-full max-w mt-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Enter phone number"
                className="input input-bordered w-full max-w mt-5"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Enter telegram id"
                className="input input-bordered w-full max-w mt-5"
                value={telegramID}
                onChange={(e) => setTelegramID(e.target.value)}
              />
              <select
                className="select select-bordered w-full max-w mt-5"
                onChange={(e) => setValue(e.target.value)}
                required
              >
                <option selected value={selectedId}>
                  {selectedClass}
                </option>
                {category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
                {/* <option>Han Solo</option>
                <option>Greedo</option> */}
              </select>
            </form>
          </p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={handleFormSubmit}
            >
              Submit
            </label>
          </div>
        </div>
      </div>
      {/* {filterParam != "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

function ClassWithId() {
  //   const [trans, setTrans] = useState([]);

  const removeFilter = () => {
    setStudent(temp);
  };

  const applyFilter = (params) => {
    let filteredTransactions = student.filter((t) => {
      return t.location == params;
    });
    setStudent(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = student.filter((t) => {
      return (
        t.full_name.toLowerCase().includes(value.toLowerCase()) ||
        t.full_name.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(filteredTransactions);
    setStudent(filteredTransactions);
  };

  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [student, setStudent] = useState([]);
  const [temp, setTemp] = useState([]);

  const loadClass = async () => {
    try {
      console.log(id);
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/class/${id}`,
        { headers }
      );

      setName(res.data.data.name);
      setDescription(res.data.data.description);
      setUrl(res.data.data.url);
      console.log(res.data.data);

      const res2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/student?class=${id}`,
        { headers }
      );
      setStudent(res2.data.data);
      setTemp(res2.data.data);
      console.log(student);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadClass();
  }, []);

  return (
    <div className="outer_container px-5 py-3">
      <TitleCard
        title="Student List"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
            selectedClass={name}
            selectedId={id}
            loadClass={loadClass}
          />
        }
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                {/* <th>Location</th>
                <th>Amount</th>
                <th>Transaction Date</th> */}
              </tr>
            </thead>
            <tbody>
              {student.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        {/* <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div> */}
                        <div>
                          <div className="font-bold">{l.full_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.phone_number}</td>
                    {/* <td>{l.location}</td>
                    <td>${l.amount}</td>
                    <td>{moment(l.date).format("D MMM")}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </div>
  );
}

export default ClassWithId;
