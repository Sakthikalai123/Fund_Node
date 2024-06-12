export const clientRoutes = [
    {        
        path: '/db/uobkh/dashboard/dcdf99b6-aa0b-46d7-9ef5-f04bc8a15c34', 
        component: 'DB_Dashboard',     
        
    },
    {        
        path: '/db/pspl/dashboard/b2d4c049-0574-4981-aa48-18f6d68b5306', 
        component: 'DB_Dashboard',     
        
    },
    {        
        path: '/db/dbs/dashboard/a7405b27-fcc5-4f26-a29e-f007d23470c1', 
        component: 'DB_Dashboard',     
        
    },
    {        
        path: '/db/singlife/dashboard/e905c49d-d88e-4419-88b8-3f8b946bc63e', 
        component: 'DB_Dashboard',     
        
    },
    {
        path: '/db/uobkh/orders', 
        redirect:'/db/uobkh/orders/fileinfo',      
        childrens:[
            {
                component: 'DB_FileInfo',
                path: '/db/uobkh/orders/fileinfo'
            },
            {
                component: 'DB_OrderInfo',
                path: '/db/uobkh/orders/orderinfo'
            },
        ]
    },
    {
        path: '/db/pspl/orders', 
        redirect:'/db/pspl/orders/fileinfo',      
        childrens:[
            {
                component: 'DB_FileInfo',
                path: '/db/pspl/orders/fileinfo'
            },
            {
                component: 'DB_OrderInfo',
                path: '/db/pspl/orders/orderinfo'
            },
        ]
    },
    {
        path: '/db/dbs/orders', 
        redirect:'/db/dbs/orders/fileinfo',      
        childrens:[
            {
                component: 'DB_FileInfo',
                path: '/db/dbs/orders/fileinfo'
            },
            {
                component: 'DB_OrderInfo',
                path: '/db/dbs/orders/orderinfo'
            },
        ]
    },
    {
        path: '/db/singlife/orders', 
        redirect:'/db/singlife/orders/fileinfo',      
        childrens:[
            {
                component: 'DB_FileInfo',
                path: '/db/singlife/orders/fileinfo'
            },
            {
                component: 'DB_OrderInfo',
                path: '/db/singlife/orders/orderinfo'
            },
        ]
    },
          
  
]

export const authenticatedRoutes = [ 
    {        
        path: '/home', 
        redirect:'/home/dashboard',      
        childrens:[
            {
                component: 'Ops_Dashboard',
                path: '/home/dashboard'
            },   
        ]        
    }, 
    {        
        path: '/home/reconciliation', 
        redirect:'/home/reconciliation/ab-process',      
        childrens:[           
            {
                component: 'Ops_AB_Recon',
                path: '/home/reconciliation/ab-process',
                innerChild:[
                    {
                        component: 'OrderRecon',
                        path: '/home/reconciliation/ab-process/orders',
                    },
                    {
                        component: 'AmountRecon',
                        path: '/home/reconciliation/ab-process/amount',
                    },
                    {
                        component: 'InvestorRecon',
                        path: '/home/reconciliation/ab-process/investor',
                    },
                    {
                        component: 'FundingApprovalRecon',
                        path: '/home/reconciliation/ab-process/fundingapproval',
                    },
                    {
                        component: 'Report',
                        path: '/home/reconciliation/ab-process/report',
                    },
                    {
                        component: 'Validation',
                        path: '/home/reconciliation/ab-process/validation',
                    }
                ]
            }, 
           /*  {
                component: 'Ops_DB_Recon',
                path: '/home/reconciliation/db-process'
            },  */        
        ]        
    }, 
    {
        path: '/home/distributororders', 
        redirect:'/home/distributororders/fileinfo',      
        childrens:[
            {
                component: 'Ops_DB_FileInfo',
                path: '/home/distributororders/fileinfo'
            },
            {
                component: 'Ops_DB_OrderInfo',
                path: '/home/distributororders/orderinfo'
            },
        ]
    },
    {
        path: '/home/agentbankorders', 
        component:"Ops_AB_Orders"
    },
    {
        path:'/distributor',
        redirect:'/distributor/inbound',
        childrens: [
            {
                component: 'DbInbound',
                path: '/distributor/inbound'
            },
            {
                component: 'DbOutbound',
                path: '/distributor/outbound'
            },
            {
                component: 'DbAcknowledgement',
                path:'/distributor/acknowledgement'
            },
            {
                component: 'DbUpload',
                path:'/distributor/upload'
            },
            {
                component: 'DbException',
                path:'/distributor/exceptionaltrades'
            }
             ]
    },
    {
        path:'/agentbank',
        redirect:'/agentbank/inbound',
        childrens: [            
            {
                component: 'AbInbound',
                path: '/agentbank/inbound'
            },
            {
                component: 'AbOutbound',
                path: '/agentbank/outbound'
            },
            {
                component: 'AbAcknowledgement',
                path:'/agentbank/acknowledgement'
            }
             ]
  
    },
    {
        path:'/transferagent',
        component:'TransferAgent',
        childrens:[]
    },          
    {
        path:'/administration',
        redirect:'/administration/participant',
        childrens: [
            {
                component: 'ParticipantBoarding',
                path: '/administration/participant'
            },
            {
                component: 'JobConfig',
                path: '/administration/jobconfig'
            },
            {
                component: 'AppDomain',
                path: '/administration/applicationdomain'
            },
            {
                component: 'AppLov',
                path: '/administration/applicationlov'
            },
            {
                component: 'AppConfig',
                path: '/administration/applicationconfig'
            },
            {
                component: 'JobFieldMap',
                path: '/administration/jobconfig/jobfieldmap/:id/:section'
            },
            
             ]
   },
   {
    component: 'Profile',
    path: '/profile'
   },
   ...clientRoutes

   /*  {
        page: 'PageNotFound' ,
        path: '*',
        auth: false,
        childrens:[]
    } */
  ]
export const unAuthenticatedRoutes = [
    ...clientRoutes,
    {        
        path: '/', 
        redirect:'/login',      
        childrens:[
            {
                component:'Login',
                path:'/login'        
            },
        ]
    },
    {
        component:'SessionExpired',
        path:'/sessiontimeout'        
    },
    {
        component:'UnAuthorized',
        path:'/unauthorized',   
    },
   
   
   
]

