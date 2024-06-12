 import { homeActions,authActions,administrationActions,agentBankActions,commonActions,distributorActions,jobFieldMapActions,modalActions, profileActions,reconciliationAction } from '../Redux/action' 
// For initial search the loadingState will takecare of the search page itself. For callback search we are managing lodingState in action component.
const common={
    exceptionTradeSearch:{
        api:'/ui/swift/search',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
    uploadSearch:{        
        api:'/ui/distributor/file/upload/search',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
    participant:{
        api:'/ui/participant/search',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
    jobConfig:{
        api:'/ui/jobconfig/search',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }  ,
    appLOV:{       
        api:'/ui/lov/search',
        method:'post',
        func:commonActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
    appDomain:{
        api:'/ui/lovdomain/search',
        method:'post',
        func:commonActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
    appConfig:{       
        api:'/ui/appconfig/search',
        method:'post',
        func:commonActions.setRecords ,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }        
        }
export const participant={
    search:{
        name:'search',
        api:'/ui/participant/search',
        method:'post',        
        func:commonActions.setRecords,  
        loadingState:false,
        token:true,     
    },
    update:{
        name:'update',
        api:'/ui/participant/update',
        method:'put',
        func:commonActions.setResponse,
        loadingState:false,        
        token:true, 
        callBack:common.participant //It will trigger search api
    },
    create:{
        name:'create',
        api:'/ui/participant/create',
        method:'post',
        func:commonActions.setResponse,
        loadingState:false,        
        token:true,
        callBack:common.participant //It will trigger search api
    },
    activate:{
        name:'updateStatus',
        api:'/ui/participant/activate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,        
        callBack:common.participant, //It will trigger search api        
    },
    inActivate:{
        name:'updateStatus',
        api:'/ui/participant/inactivate',
        method:'get',
        func:commonActions.setResponse, 
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,       
        callBack:common.participant //It will trigger search api
    },
    getParticipantGroup:{
        api:'/ui/participant/participantgrouplist',
        method:'get',        
        func:administrationActions.setParticipantGroup,
        loadingState:false,
        token:true,
    },
    getParticipantSubGroup:{
        api:'/ui/participant/participantsubgrouplist',
        method:'get',
        func:administrationActions.setParticipantSubGroup,
        loadingState:false,
        token:true,
    },
    getTimeZone:{
        api:'/ui/participant/timezonelist',
        method:'get',
        func:administrationActions.setTimeZone,
        loadingState:false,
        token:true,
    } ,
    getRecordById:{
        api:'/ui/participant/retrieve',
        method:'get',
        func:modalActions.setRecordToModify,  
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token      
    }

}
export const appLOV={
    search:{
        name:'search',
        api:'/ui/lov/search',
        method:'post',        
        func:commonActions.setRecords,  
        loadingState:false,
        token:true,      
    },
    update:{
        name:'update',
        api:'/ui/lov/update',
        method:'put',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appLOV //It will trigger search api
    },
    create:{
        name:'create',
        api:'/ui/lov/create',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appLOV //It will trigger search api
    },
    activate:{
        name:'updateStatus',
        api:'/ui/lov/activate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appLOV //It will trigger search api
    },
    inActivate:{
        name:'updateStatus',
        api:'/ui/lov/inactivate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appLOV //It will trigger search api
    },
    getDomainList:{
        api:'/ui/lov/domainlist',
        method:'get',
        func:administrationActions.setDomainList,
        loadingState:false,
        token:true,
    },  
    getRecordById:{
        api:'/ui/lov/retrieve',
        method:'get',
        func:modalActions.setRecordToModify,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }

}
export const appDomain={
    search:{
        name:'search',
        api:'/ui/lovdomain/search',
        method:'post',        
        func:commonActions.setRecords,    
        loadingState:false,
        token:true,   
    },
    update:{
        name:'update',
        api:'/ui/lovdomain/update',
        method:'put',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appDomain //It will trigger search api
    },
    create:{
        name:'create',
        api:'/ui/lovdomain/create',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.appDomain //It will trigger search api
    },
    activate:{
        name:'updateStatus',
        api:'/ui/lovdomain/activate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appDomain //It will trigger search api
    },
    inActivate:{
        name:'updateStatus',
        api:'/ui/lovdomain/inactivate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appDomain //It will trigger search api
    },
    getDomainKeyList:{
        api:'/ui/lovdomain/domainkeylist',
        method:'get',
        func:administrationActions.setDomainKeyList,
        loadingState:false,
        token:true,
    },  
    getRecordById:{
        api:'/ui/lovdomain/retrieve',
        method:'get',
        func:modalActions.setRecordToModify,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }

}
export const appConfig={
    search:{
        name:'search',
        api:'/ui/appconfig/search',
        method:'post',        
        func:commonActions.setRecords,  
        loadingState:false,
        token:true,     
    },
    update:{
        name:'update',
        api:'/ui/appconfig/update',
        method:'put',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,       // If token is true then the api call with Authorization Token,
        callBack:common.appConfig //It will trigger search api
    },
    create:{
        name:'create',
        api:'/ui/appconfig/create',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.appConfig//It will trigger search api
    },
    activate:{
        name:'updateStatus',
        api:'/ui/appconfig/activate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.appConfig //It will trigger search api
    },
    inActivate:{
        name:'updateStatus',
        api:'/ui/appconfig/inactivate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.appConfig //It will trigger search api
    },
    getKeyList:{
        api:'/ui/appconfig/keylist',
        method:'get',
        func:administrationActions.setKeyList,
        loadingState:false,
        token:true,
    },  
    getRecordById:{
        api:'/ui/appconfig/retrieve',
        method:'get',
        func:modalActions.setRecordToModify,    
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token    
    }

}
export const jobConfig={  
    search:{
        name:'search',
        api:'/ui/jobconfig/search',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:false,
        token:true,
    },
    update:{
        name:'update',
        api:'/ui/jobconfig/update',
        method:'put',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.jobConfig //It will trigger search api
    },
    create:{
        name:'create',
        api:'/ui/jobconfig/create',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.jobConfig //It will trigger search api
    },
    activate:{
        name:'updateStatus',
        api:'/ui/jobconfig/activate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.jobConfig //It will trigger search api
    },
    inActivate:{
        name:'updateStatus',
        api:'/ui/jobconfig/inactivate',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.jobConfig //It will trigger search api
    },
    getParticipantList:{
        api:'/ui/jobconfig/participantlist',
        method:'get',
        func:administrationActions.setParticipantList,
        loadingState:false,
        token:true,
    },   
    getParticipantGroup:{
        api:'/ui/participant/participantgrouplist',// check
        method:'get',
        func:administrationActions.setParticipantGroup,
        loadingState:false,
        token:true,
    },
    getSpecType:{
        api:'/ui/jobconfig/spectypelist',
        method:'get',
        func:administrationActions.setSpecType,
        loadingState:false,
        token:true,
    },
    getBoundType:{
        api:'/ui/jobconfig/boundtypelist',
        method:'get',
        func:administrationActions.setBoundType,
        loadingState:false,
        token:true,
    },
    getConnectionType:{
        api:'/ui/jobconfig/connectiontypelist',
        method:'get',
        func:administrationActions.setConnectionType,
        loadingState:false,
        token:true,
    },
    getJobConfigType:{
        api:'/ui/jobconfig/jobconfigtypelist',
        method:'get',
        func:administrationActions.setJobConfigType,
        loadingState:false,
        token:true,
    },
    getRecordById:{
        api:'/ui/jobconfig/retrieve',
        method:'get',
        func:modalActions.setRecordToModify,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
    sftpValidation:{
        api:'/ui/jobconfig/validateconfig',
        method:'get',
        func:modalActions.setSftpValidationStatus,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }
}

export const distributorInbound={
    search:{
        name:'search',
        api:'/ui/distributor/search/inbound',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:false,
        token:true,
    },
    getDistributorInboundList:{
        api:'/ui/distributor/search/distributorlist',
        method:'get',
        func:distributorActions.setDistributorInboundList,
        loadingState:false,
        token:true,
    },
    getFdlt:{
        api:'/ui/distributor/search/inbound/fdlterror',
        method:'get',       
        func:distributorActions.setFdltData,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }
}

export const jobFieldMap={
    create:{
        api:'/ui/jobfieldmapping/create',
        method:'post',
        name:'create',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        /* callBack:common.jobConfig  */
    },
    delete:{
        api:'/ui/jobfieldmapping/delete',
        method:'post',
        name:'delete',
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        func:commonActions.setResponse,
       /*  callBack:common.jobConfig  */
    },
    getRecords:{
        api:'/ui/jobfieldmapping/getbysection',
        method:'get',
        func:jobFieldMapActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
  
    getConditioTypeList:{
        api:'/ui/jobfieldmapping/conditiontype',
        method:'get',
        func:jobFieldMapActions.setConditionTypeList,
        loadingState:false,
        token:true,
    },
    getLovDomainList:{
        api:'/ui/jobfieldmapping/lovdomain',
        method:'get',
        func:jobFieldMapActions.setLovDomainList,
        loadingState:false,
        token:true,
    },
    getDataTypeList:{
        api:'/ui/jobfieldmapping/datatype',       
        method:'get',
        func:jobFieldMapActions.setDataTypeList,
        loadingState:false,
        token:true,
    },
    getLovTypeList:{       
        api:'/ui/jobfieldmapping/lovtype',
        method:'get',
        func:jobFieldMapActions.setLovTypeList,
        loadingState:false,
        token:true,
    },
}

export const distributorOutbound={
    search:{
        name:'search',
        api:'/ui/distributoroutbound/search/outbound',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:false,
        token:true,
    },
    getDistributorOutboundList:{
        api:'/ui/distributoroutbound/search/distributorlist',
        method:'get',
        func:distributorActions.setDistributorOutboundList,
        loadingState:false,
        token:true,
    },
 
}
export const distributorAcknowledgement={
    search:{
        name:'search',
        api:'/ui/distributoracknowledgement/search/acknowledgement',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:false,
        token:true,
    },
    getDistributorAckList:{
        api:'/ui/distributoracknowledgement/search/distributorlist',
        method:'get',
        func:distributorActions.setDistributorAckList,
        loadingState:false,
        token:true,
    }
}
export const agentBankAcknowledgement={
    search:{
        name:'search',
        api:'/ui/agentbankacknowledgement/search/acknowledgement',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:false,
        token:true,
    },
    getDistributorAckList:{
        api:'/ui/agentbankacknowledgement/search/agentbanklist',
        method:'get',
        func:agentBankActions.setAgentBankAckList,
        loadingState:false,
        token:true,
    }
}
export const agentBankInbound={
    search:{
        name:'search',
        api:'/ui/agentbank/search/inbound',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:false,
        token:true,
    },
    getAgentBankList:{
        api:'/ui/agentbank/search/agentbanklist',
        method:'get',
        func:agentBankActions.setAgentBankList,
        loadingState:false,
        token:true,
    },
 
}
export const agentBankOutbound={
    search:{
        name:'search',
        api:'/ui/agentbankoutbound/search/outbound',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:false,
        token:true,
    },
    getAgentBankList:{
        api:'/ui/agentbankoutbound/search/agentbanklist',
        method:'get',
        func:agentBankActions.setAgentBankOutboundList,
        loadingState:false,
        token:true,
    },
 
}
export const authentication={
    userInfo:{
        api:'/ui/user/info',
        method:'get',
        func:authActions.setUserInfo,
        loadingState:false,        
        token:true,        
    },
    logOut:{
        api:'/auth/logout',
        method:'get',
        func:authActions.triggerLogout,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }
}
export const profile={
    create:{
        name:'create',
        api:'/ui/user/create',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    },
    roleList:{        
        api:'/ui/user/rolelist',
        method:'get',
        func:profileActions.setRoleList,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }
    
}
export const distributorUpload={
    search:{
        name:'search',
        api:'/ui/distributor/file/upload/search',
        method:'post',        
        func:commonActions.setRecords,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token // for upload search the loadingSate we are triggering from actioncomponent
    },
    upload:{
        name:'upload',
        api:'/ui/distributor/file/upload',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.uploadSearch //It will trigger search api
   }, 
    approve:{
        name:'update',
        api:'/ui/distributor/file/approve',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.uploadSearch //It will trigger search api
   },
   reject:{
        name:'update',
        api:'/ui/distributor/file/reject',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.uploadSearch //It will trigger search api
}
 
}
export const exceptionTrade = {
    search:{
        name:'search',
        api:'/ui/swift/search',
        method:'post',        
        func:commonActions.setRecords,  
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token // for upload search the loadingSate we are triggering from actioncomponent
    },
    ackSubmit:{
        name:'update',
        api:'/ui/swift/ackreceived',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.exceptionTradeSearch //It will trigger search api  
    },
    resSubmit:{
        name:'update',
        api:'/ui/swift/responsereceived',
        method:'post',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.exceptionTradeSearch //It will trigger search api 
    },
    ackApprove:{
        name:'update',
        api:'/ui/swift/ackprocessed',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.exceptionTradeSearch //It will trigger search api
   },
   resApprove:{
        name:'update',
        api:'/ui/swift/responseprocessed',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.exceptionTradeSearch //It will trigger search api
    },
   ackReject:{
        name:'update',
        api:'/ui/swift/ackrejected',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.exceptionTradeSearch //It will trigger search api
    },
   resReject:{
        name:'update',
        api:'/ui/swift/responserejected',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
        callBack:common.exceptionTradeSearch //It will trigger search api
    },
    getAck:{
        name:'update',
        api:'/ui/swift/swiftsubmitted',
        method:'get',
        func:commonActions.setResponse,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token,
         callBack:common.exceptionTradeSearch //It will trigger search api    
    },
    getRecordById:{
        api:'/ui/swift/loadData',
        method:'get',
        func:modalActions.setRecordToModify,
        loadingState:true,
        token:true,      // If token is true then the api call with Authorization Token
    }
}
export const opsDBDashboard = {
    getFileStats:{
        api:'/ui/dashboard/operation/filedata',
        method:'post',
        func:homeActions.setOverallParticipantFileStats,
        loadingState:false,
        token:true,
     },
    getSubscriptionOrderStats:{
        api:'/ui/dashboard/operation/orderdata',
        method:'post',
        func:homeActions.setSubscriptionStatsForOps,
        loadingState:false,
        token:true,
     },
     getRedemptionOrderStats:{
        api:'/ui/dashboard/operation/orderdata',
        method:'post',
        func:homeActions.setRedemptionStatsForOps,
        loadingState:false,
        token:true,
     },
     getSwitchSubscriptionOrderStats:{
        api:'/ui/dashboard/operation/orderdata',
        method:'post',
        func:homeActions.setSwitchSubscriptionStatsForOps,
        loadingState:false,
        token:true,
     },
     getSwitchRedemptionOrderStats:{
        api:'/ui/dashboard/operation/orderdata',
        method:'post',
        func:homeActions.setSwitchRedemptionStatsForOps,
        loadingState:false,
        token:true,
     },   
}
export const dBDashboard = {
    getFileStats:{
        api:'/ui/dashboard/distributor/filedata',
        method:'post',
        func:homeActions.setIndividualParticipantFileStats,
        loadingState:false,
        token:false,
     },
    getSubscriptionOrderStats:{
        api:'/ui/dashboard/distributor/orderdata',
        method:'post',
        func:homeActions.setSubscriptionStatsForOps,
        loadingState:false,
        token:false,
     },
     getRedemptionOrderStats:{
        api:'/ui/dashboard/distributor/orderdata',
        method:'post',
        func:homeActions.setRedemptionStatsForOps,
        loadingState:false,
        token:false,
     },
     getSwitchSubscriptionOrderStats:{
        api:'/ui/dashboard/distributor/orderdata',
        method:'post',
        func:homeActions.setSwitchSubscriptionStatsForOps,
        loadingState:false,
        token:false,
     },
     getSwitchRedemptionOrderStats:{
        api:'/ui/dashboard/distributor/orderdata',
        method:'post',
        func:homeActions.setSwitchRedemptionStatsForOps,
        loadingState:false,
        token:false,
     },
     getReport:{
        api:'/distributor/dashboard/distributor/summary',
        method:'post',
        func:homeActions.setReport,
        loadingState:true,
        token:false,
     }   
}
export const dbOrderInfo = {    
     search:{
        name:'search',
        api:'/ui/home/order/distributor/orderdata',
        method:'post',        
        func:commonActions.setRecords,  
        loadingState:false,
        token:true,     
    },
    getDistributorList:{
        api:'/ui/distributor/search/distributorlist',
        method:'get',
        func:distributorActions.setDistributorInboundList,
        loadingState:false,
        token:true,
    },
}
export const dbFileInfo = {    
    search:{
       name:'search',
       api:'/ui/home/order/distributor/filedata',
       method:'post',        
       func:commonActions.setRecords,  
       loadingState:false,
       token:true,     
   },
   getDistributorList:{
        api:'/ui/distributor/search/distributorlist',
        method:'get',
        func:distributorActions.setDistributorInboundList,
        loadingState:false,
        token:true,
    },
}
export const abReconProcess= {   
    orderSearch:{
        name:'search',
        api:'/ui/home/reconciliation/orders',
        method:'post',        
        func:reconciliationAction.setOrders,  
        loadingState:false,
        token:true,     
    },
    amountSearch:{
        name:'search',
        api:'/ui/home/reconciliation/amount',
        method:'post',        
        func:reconciliationAction.setAmount,  
        loadingState:false,
        token:true,     
    },
    investorSearch:{
        name:'search',
        api:'/ui/home/reconciliation/investors',
        method:'post',        
        func:reconciliationAction.setInvestor,  
        loadingState:false,
        token:true,     
    },
    fundingSearch:{
        name:'search',
        api:'/ui/home/reconciliation/funding',
        method:'post',        
        func:reconciliationAction.setFunding,  
        loadingState:false,
        token:true,     
    },
    reportSearch:{
        name:'search',
        api:'/ui/home/reconciliation/reporting',
        method:'post',        
        func:reconciliationAction.setReport,  
        loadingState:false,
        token:true,     
    },
    validationSearch:{
        name:'search',
        api:'/ui/home/reconciliation/abvalidation',
        method:'post',        
        func:reconciliationAction.setValidation,  
        loadingState:false,
        token:true,     
    },    
    getDistributorList:{
        api:'/ui/distributor/search/distributorlist',
        method:'get',
        func:reconciliationAction.setDistributorList,
        loadingState:false,
        token:true,
    },
    getAgentBankList:{
        api:'/ui/agentbank/search/agentbanklist',
        method:'get',
        func:reconciliationAction.setAgentBankList,
        loadingState:false,
        token:true,
    },
    getReconRecord:{
        api:'/ui/home/reconciliation/view',
        method:'post',
        func:reconciliationAction.setABProcessReconRecord,
        loadingState:true,
        token:true,
    },
}
export const email = {
    abProcessReportEmail:{
        name:'email',
        api:'/ui/home/reconciliation/email',
        method:'post',        
        func:commonActions.setResponse, 
        loadingState:false,
        token:true,     
    },
}
