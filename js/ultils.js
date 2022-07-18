export function getDataFromDoc(doc){
    let data =  doc.data();
    data.id = doc.id;
    return data;
}
// docs là một mảng
export function getDataFromDocs(docs){
    return docs.map(function(doc){
        return getDataFromDoc(doc);
    });
}