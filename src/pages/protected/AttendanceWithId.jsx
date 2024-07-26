import { useParams } from "react-router-dom";
import axios from "axios";
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
}) => {
  const { id } = useParams();
  //   const [filterParam, setFilterParam] = useState("");
  //   const [searchText, setSearchText] = useState("");
  //   const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  //   const showFiltersAndApply = (params) => {
  //     applyFilter(params);
  //     setFilterParam(params);
  //   };

  //   const removeAppliedFilter = () => {
  //     removeFilter();
  //     setFilterParam("");
  //     setSearchText("");
  //   };

  //   useEffect(() => {
  //     console.log(id);
  //     if (searchText == "") {
  //       removeAppliedFilter();
  //     } else {
  //       applySearch(searchText);
  //     }
  //   }, [searchText]);

  //   useEffect(() => {
  //     getAllCategory();
  //   }, []);

  //   const dispatch = useDispatch();

  // const openAddNewLeadModal = () => {
  //   dispatch(
  //     openModal({
  //       title: "Add New Lead",
  //       bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
  //     })
  //   );
  // };
  //   const getAllCategory = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const headers = {
  //         "x-refresh-token": `Bearer ${token}`,
  //       };

  //       const res = await axios.get(
  //         `https://nice-teal-hen-fez.cyclic.app/class`,
  //         { headers }
  //       );
  //       setCategory(res.data.data);
  //       console.log("this is cate", category);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const [username, setUsername] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [value, setValue] = useState(selectedId);
  //   const [additional, setAdditional] = useState("");
  //   const [category, setCategory] = useState([]);

  //   const handleFormSubmit = async (e) => {
  //     const data = {
  //       full_name: username,
  //       phone_number: phone,
  //       class: value,
  //       // additional: additional,
  //     };

  //     setAdditional("");
  //     setPhone("");
  //     setUsername("");
  //     console.log(data);

  //     try {
  //       const token = localStorage.getItem("token");
  //       const headers = {
  //         "x-refresh-token": `Bearer ${token}`,
  //       };

  //       const res = await axios.post(
  //         `https://nice-teal-hen-fez.cyclic.app/student`,
  //         data,
  //         { headers }
  //       );
  //       window.location.reload();
  //       dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const [date, setDate] = useState(new Date());

  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [student, setStudent] = useState([]);

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const callAttendanceList = async (currentDate) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/attendance`,
        { headers }
      );
      setStudent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  return (
    <div className="inline-block float-right">
      {/* <input type="date" selected={date} onChange={date => setDate(date)} className="input"/> */}
      <input
        type="date"
        id="datePicker"
        value={currentDate} // Step 2: Set the value to the current date
        className="input input-bordered "
        onChange={(e) => setCurrentDate(e.target.value)} // Optional: Handle changes if needed
      />

      <button className="btn btn-primary">Primary</button>

      {/* <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      <label htmlFor="my_modal_6" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      {/* <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
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
                ))} */}
      {/* <option>Han Solo</option>
                <option>Greedo</option> */}
      {/* </select>
              <input
                type="text"
                required
                placeholder="Enter description"
                className="input input-bordered w-full max-w mt-5"
                value={additional}
                onChange={(e) => setAdditional(e.target.value)}
              />
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
      </div> */}
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

function AttendanceWithId() {
  //   const [trans, setTrans] = useState([]);

  //   const removeFilter = () => {
  //     setStudent(temp);
  //   };

  //   const applyFilter = (params) => {
  //     let filteredTransactions = student.filter((t) => {
  //       return t.location == params;
  //     });
  //     setStudent(filteredTransactions);
  //   };

  //   // Search according to name
  //   const applySearch = (value) => {
  //     let filteredTransactions = student.filter((t) => {
  //       return (
  //         t.full_name.toLowerCase().includes(value.toLowerCase()) ||
  //         t.full_name.toLowerCase().includes(value.toLowerCase())
  //       );
  //     });
  //     console.log(filteredTransactions);
  //     setStudent(filteredTransactions);
  //   };

  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [student, setStudent] = useState([]);

  let classNames = "badge";

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const callAttendanceList = async (currentDate) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };

      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/attendance`,
        { headers }
      );
      setStudent(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [markSheetId, setMarkSheetId] = useState("");
  //   const [student, setStudent] = useState([]);
  const [attenId, setAttenId] = useState("");
  const loadClass = async () => {
    try {
      //   console.log(id);
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };
      //   const res = await axios.get(
      //     `https://nice-teal-hen-fez.cyclic.app/class/${id}`,
      //     { headers }
      //   );

      //   setName(res.data.data.name);
      //   setDescription(res.data.data.description);
      //   setUrl(res.data.data.url);
      //   console.log(res.data.data);

      const res2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/attendance/${id}/${currentDate}`,
        { headers }
      );
      //   if (res2.data?.data == null) console.log("afjlnafln ls anslkd");

      //   else console.log(res2.data?.data.attendance);
      if (res2.data?.data == null) {
        setStudent([]);
      } else {
        setStudent(res2.data?.data.attendance);
        setAttenId(res2?.data.data._id);
        console.log("this is attendID", attenId);
        setMarkSheetId(res2.data.data._id);
      }
      // setTemp(res2.data.data);
      console.log("this is student", student);

      console.log(currentDate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadClass();
  }, [currentDate]);

  const handleRadioChange = async (event, index, studentId) => {
    const updatedAttendanceList = [...student];
    updatedAttendanceList[index].mark = event.target.value;

    console.log(updatedAttendanceList[index].mark);

    try {
      const data = {
        id: attenId,
        student: studentId,
        mark: event.target.value,
      };

      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };
      const res1 = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/attendance`,
        data,
        { headers }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setStudent(updatedAttendanceList);
  };

  const createAttendSheetHandler = async () => {
    try {
      const data = {
        class: id,
        date: currentDate,
      };
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };
      const res1 = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/attendance`,
        data,
        { headers }
      );
      // console.log("this is id", res1.data.data._id);

      loadClass();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessageHandler = async () => {
    try {
      const data = {
        id: markSheetId,
      };
      if (markSheetId !== "" && student.length !== 0) {
        const token = localStorage.getItem("token");
        const headers = {
          "x-refresh-token": `Bearer ${token}`,
        };
        const res1 = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/attendance/message`,
          data,
          { headers }
        );
        loadClass();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {}, [student]);

  return (
    <div className="outer_container px-5 py-3">
      <TitleCard title="Mark Attendance" topMargin="mt-2 ">
        <div className="mb-3 flex flex-wrap items-center justify-around gap-4">
          <input
            type="date"
            id="datePicker"
            value={currentDate} // Step 2: Set the value to the current date
            className="input input-bordered "
            onChange={(e) => setCurrentDate(e.target.value)} // Optional: Handle changes if needed
          />

          <button
            className="btn btn-primary "
            onClick={createAttendSheetHandler}
          >
            Create Marksheet
          </button>

          <button className="btn btn-primary" onClick={sendMessageHandler}>
            Send Message
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          {student.length === 0 ? (
            <>
              <h2 className="flex items-center justify-center">
                The marksheet has not been created yet. Please click on 'Create
                Marksheet'
              </h2>
            </>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Unmarked</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Status</th>

                  {/* <th>Amount</th>
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
                            <div className="font-bold">
                              {l.student.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{l.student.phone_number}</td>

                      {/* <td><input type="radio"  className="radio radio-primary" checked/></td>
                    <td><input type="radio"  className="radio radio-primary"  /></td>
                    <td><input type="radio"  className="radio radio-primary"  /></td> */}

                      <td>
                        <input
                          type="radio"
                          className="radio"
                          value="unmarked"
                          checked={l.mark === "unmarked"}
                          onChange={(e) =>
                            handleRadioChange(e, k, l.student._id)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          className="radio radio-primary"
                          value="present"
                          checked={l.mark === "present"}
                          onChange={(e) =>
                            handleRadioChange(e, k, l.student._id)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          className="radio radio-secondary"
                          value="absent"
                          checked={l.mark === "absent"}
                          onChange={(e) =>
                            handleRadioChange(e, k, l.student._id)
                          }
                        />
                      </td>
                      <td>
                        <div
                          className={`badge ${
                            l.message_status === "not sent"
                              ? "badge-secondary"
                              : l.message_status === "sent"
                              ? "badge-primary"
                              : "badge-neutral"
                          }`}
                        >
                          {l.message_status}
                        </div>
                      </td>

                      {/* <td>${l.amount}</td>
                    <td>{moment(l.date).format("D MMM")}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {/* ) */}
          {/* } */}
        </div>
      </TitleCard>
    </div>
  );
}

export default AttendanceWithId;
