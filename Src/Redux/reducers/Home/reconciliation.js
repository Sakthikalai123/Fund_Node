import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: { totalRecords: null, data: [] },
    orderAmount: { totalRecords: null, data: [] },
    investors: { totalRecords: null, data: [] },
    funding: { totalRecords: null, data: [] },
    report: { totalRecords: null, data: [] },
    validation: { totalRecords: null, data: [] },
    abProcessReconRecord: { totalRecords: null, data: [] },
    distributorList:[],
    agentBankList:[],
    transactionType:["P","S"],
    accountType:["SRS","CPFOA"],

}
const reconciliationSlice = createSlice({
    name:"reconciliation",
    initialState,
    reducers:{
    refresh:(state) => {
        return {...initialState}
    },
    resetReconRecord:(state,action)=>{
        state.abProcessReconRecord = { totalRecords: null, data: [] };
    },
    setOrders: (state, action) => { 
        const result = action.payload     
        state.orders = result;        
    }, 
    setAmount: (state, action) => { 
        const result = action.payload     
        state.orderAmount = result;        
    }, 
    setInvestor: (state, action) => { 
        const result = action.payload     
        state.investors = result;        
    }, 
    setFunding: (state, action) => { 
        const result = action.payload     
        state.funding = result;        
    },
    setReport: (state, action) => { 
        const result = action.payload     
        state.report = result;        
    }, 
    setValidation: (state, action) => { 
        const result = action.payload     
        state.validation = result;        
    },
    setDistributorList: (state, action) => { 
        const result = action.payload     
        state.distributorList = result;        
    },
    setAgentBankList: (state, action) => { 
        const result = action.payload     
        state.agentBankList = result;        
    },
    setABProcessReconRecord: (state, action) => { 
        const result = action.payload     
        state.abProcessReconRecord = result;        
    },
   }
})

export default reconciliationSlice;