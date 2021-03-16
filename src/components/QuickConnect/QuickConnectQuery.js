export const getQuickConnectQuery = `
query allQuickconnects($obj: JSON){
  allQuickconnects(where: $obj){
    Quickconnects{
        createdby
        createdon
        id
        updatedby
        updatedon
        userid
        wanttoconnectedwithotherpeople
        wanttoconnectedwithotherpeopleareinsamearea
        wanttoconnectedwithotherpeoplehavesimilargoal
        wanttoconnectedwithotherpeoplehavesimilarinterests
        wanttoconnectedwithotherpeopleinperson
        wanttoconnectedwithotherpeoplevirtually
        wanttoconnectedwithotherpeoplewithsimilarage
        userId
    }
  }
} 
`;

export const saveQuickConnectQuery = `
mutation saveQuickconnect($obj: QuickconnectInput!){
  saveQuickconnect(obj: $obj){
    createdby
    createdon
    id
    updatedby
    updatedon
    userid
    wanttoconnectedwithotherpeople
    wanttoconnectedwithotherpeopleareinsamearea
    wanttoconnectedwithotherpeoplehavesimilargoal
    wanttoconnectedwithotherpeoplehavesimilarinterests
    wanttoconnectedwithotherpeopleinperson
    wanttoconnectedwithotherpeoplevirtually
    wanttoconnectedwithotherpeoplewithsimilarage
    userId
  }
} 
`;
