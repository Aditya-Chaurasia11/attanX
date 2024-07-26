import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
	const token = localStorage.getItem("token");
      const headers = {
        "x-refresh-token": `Bearer ${token}`,
      };

    //   console.log(leadObj);
      console.log(token);   
      console.log(headers);

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/class?description=true`,
        { headers }
      );
	return response.data;
})

export const leadsSlice = createSlice({
    name: 'leads',
    initialState: {
        isLoading: false,
        leads : []
    },
    reducers: {


        addNewLead: (state, action) => {
            let {newLeadObj} = action.payload
            state.leads = [...state.leads, newLeadObj]
        },

        deleteLead: (state, action) => {
            let {index} = action.payload
            state.leads.splice(index, 1)
        }
    },

    extraReducers: {
		[getLeadsContent.pending]: state => {
			state.isLoading = true
		},
		[getLeadsContent.fulfilled]: (state, action) => {
			state.leads = action.payload.data
			state.isLoading = false
		},
		[getLeadsContent.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewLead, deleteLead } = leadsSlice.actions

export default leadsSlice.reducer