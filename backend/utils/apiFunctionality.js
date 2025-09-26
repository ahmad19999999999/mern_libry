class apiFunctionality{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }
search() {
    const keyword = this.querystr.keyword
        ? {
              $or: [
                  { title: { $regex: this.querystr.keyword, $options: "i" } }, 
                  { author: { $regex: this.querystr.keyword, $options: "i" } }, 
                  { isbn: { $regex: this.querystr.keyword, $options: "i" } }, 
              ],
          }
        : {};

    this.query = this.query.find({ ...keyword });
    return this;
}




pagination(resultPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
}



    
}

export default apiFunctionality;