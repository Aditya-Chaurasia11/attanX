import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Class",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  // const getDummyStatus = (index) => {
  //     if(index % 5 === 0)return <div className="badge">Not Interested</div>
  //     else if(index % 5 === 1)return <div className="badge badge-primary">In Progress</div>
  //     else if(index % 5 === 2)return <div className="badge badge-secondary">Sold</div>
  //     else if(index % 5 === 3)return <div className="badge badge-accent">Need Followup</div>
  //     else return <div className="badge badge-ghost">Open</div>
  // }

  // const deleteCurrentLead = (index) => {
  //     dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION,
  //     extraObject : { message : `Are you sure you want to delete this lead?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
  // }
  const goToClass = (id) => {
    navigate(`/app/class/${id}`);
  };

  return (
    <>
      <TitleCard
        title="Current Classes"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          {/* <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>

                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Class Link</th>
                // <th>Status</th>
                // <th>Assigned To</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={l.url} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                                                <div className="font-bold">{l.first_name}</div>
                                                <div className="text-sm opacity-50">{l.last_name}</div>
                                            </div>
                      </div>
                    </td>
                    <td>{l.name}</td>
                    <td>{moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY")}</td>
                    <td>{getDummyStatus(k)}</td>
                    <td>{l.description}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => goToClass(l._id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          {leads.map((l, k) => {
            return (
              <div
                className="card card-side bg-base-100 shadow-xl mx-4 my-2 mb-3.5 h-40 cursor-pointer"
                onClick={() => goToClass(l._id)}
              >
                <figure className="w-1/3">
                  <img src={l.url} alt="Movie" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{l.name?.slice(0, 7)}...</h2>
                  <p>{l.description?.slice(0, 7)}</p>
                </div> 
              </div>
            );
          })}
        </div>  
      </TitleCard>
    </>
  );
}

export default Leads;
