import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";
import axios from "axios";

const INITIAL_LEAD_OBJ = {
  name: "",
  description: "",
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.name.trim() === "")
      return setErrorMessage("First Name is required!");
    else if (leadObj.description.trim() === "")
      return setErrorMessage("Email id is required!");
    else {
      const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };

      console.log(leadObj);
      console.log(token);   
      console.log(headers);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/class`,
        leadObj,
        { headers }
      );

    //   dispatch(addNewLead({ leadObj }));
    window.location.reload();
      // dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.description}
        updateType="description"
        containerStyle="mt-4"
        labelTitle="description"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
