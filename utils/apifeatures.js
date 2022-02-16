class ApiFeatures{
    // HERE API CONSTRUCTOR -> EX -> PRODUCTNAME = queryStr , Find-> query
    constructor(query , queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    // SEARCH FEATURE OF API -> query parameter inside api feature = queryStr
    // Deals with keyword inside Querystr

    search(){
        const keyword = this.queryStr.keyword 
        ? {
            itemName:{

                // here to find name can also use inside find() -> But find name with pattern -> using mongodb operator regex
                // Ex: watch and watchex
                // "i" is for case insensetive
                
                $regex: this.queryStr.keyword,
                $options: "i" ,
            },
        } 
        : {};

        // console.log(keyword);

        // this.query -> find method of getproducts
        this.query = this.query.find({ ...keyword }); 
        return this;
    }




};

module.exports = ApiFeatures;