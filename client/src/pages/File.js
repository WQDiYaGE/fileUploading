import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

function File() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [reloadPage, setReloadPage] = useState(false);

    const [moduleName, setModuleName] = useState("");
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [submittedDate, setSubmittedDate] = useState("");
    const [submittionStatus, setSubmittionStatus] = useState("");

    useEffect(() => {
        if(uploadSuccess){
            setReloadPage(true);
        }
    }, [uploadSuccess]);

    useEffect(() => {
        if(reloadPage) {
            window.location.reload();
        }
    },[reloadPage]);


  
    const moduleNameInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const dueDateInputRef = useRef(null);
    const submittedDateInputRef = useRef(null);
    const submittionStatusInputRef = useRef(null);

    const fileInputRef = useRef(null);

    const getItems = async () => {
        setLoading(true);
        try{
          const res = await axios.get("http://localhost:5000/api/v1/items");
          setItems(res.data.items);
    
          setLoading(false);
    
          console.log(res.data.items);
          
        } catch(error) {
          console.log(error);
        }
    };

    useEffect( () => {
        getItems();
    }, []);



    const addItem = async (e) => {
      e.preventDefault();
      try{
        const formData = new FormData();
  
        formData.append("moduleName", moduleName);
        formData.append("title", title);
        formData.append("dueDate", dueDate);
        formData.append("submittedDate", submittedDate);
        formData.append("submittionStatus", submittionStatus);

        formData.append("file", fileInputRef.current.files[0]);
  
        const item = await axios.post(
          "http://localhost:5000/api/v1/items", 
          formData
        );
        console.log(item);
        if(item.data.status === "ok"){
            alert("You have submitted successfully!");
            viewItem();
        }


        setModuleName("");
        setTitle("");
        setDueDate("");
        setSubmittedDate("");
        setSubmittionStatus("");
  
        moduleNameInputRef.current.value = "";
        titleInputRef.current.value = "";
        dueDateInputRef.current.value = "";
        submittedDate.current.value = "";
        submittionStatus.current.value = "";

        fileInputRef.current.value = null;

        setUploadSuccess(true);
      }
      catch(error) {
        console.log(error);
      }
    };

    const viewItem = (itemId) => {
        window.open(`http://localhost:5000/api/v1/items/view/${itemId}`, "_blank", "noreferrer");
        
    };

    // const downloadItem = async (id) => {
    //     try {
    //       const res = await axios.get(
    //         `http://localhost:5000/api/v1/items/download/${id}`,
    //         { responseType: 'blob' }
    //       );
          
    //       const contentDispositionHeader = res.headers['content-disposition'];
    //       console.log(contentDispositionHeader);
    
    //       const fileNameMatch = contentDispositionHeader.match(/filename="(.+)"/);
          
    
    //       let fileName;
    //       console.log("File Name: ",fileName);
    //       if (fileNameMatch && fileNameMatch[1]) {
    //         fileName = fileNameMatch[1];
    //       } else {
    //         console.log('Filename not found in content-disposition header');
    //         fileName = 'default-filename.txt';
    //       }
    
    //       const fileExtension = fileName.split('.').pop().toLowerCase();
    
    //       const fileType = res.headers['content-type'] || 'application/octet-stream';
    
          
    //       const blob = new Blob([res.data], {type: fileType });
    
          
    //       const link = document.createElement('a');
    //       link.href = window.URL.createObjectURL(blob);
    
    //       // Check if the fileName already includes an extension
    //       if (!/\./.test(fileName)) {
    //         // Set the appropriate file extension for PDF files
    //         if(fileType === 'application/pdf') {
    //           link.download = `${fileName}.pdf`;
    //         } 
    //         else {
    //           link.download = `${fileName}.${fileExtension}`;
    //         }
    //       }
    //       link.download = fileName;
    
    //       document.body.appendChild(link);
    
          
    //       link.click();
    //       document.body.removeChild(link);
    //     } catch (error) {
    //       console.log(error);
    //     }
    // };

    const deleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/items/${itemId}`);

            console.log("Item removed successfully");
        } catch(error) {
            console.log(error);
        }
    };


  return (
    <>
    <div class="container">
        <p class="display-4">Student Submission</p>
            <div class= "m-2">
                <table class="table table-bordered">
                    <tbody>
                        <tr>    
                            <td class= "mx-2">Module Name</td>
                            <td>
                                <input 
                                type="text" 
                                class="mx-2" 
                                id="formGroupExampleInput"
                                ref={moduleNameInputRef}
                                onChange={(e) => setModuleName(e.target.value)}
                                />
                            </td>        
                        </tr>
                        <tr>    
                            <td class= "mx-2">Title</td>
                            <td>
                                <input 
                                type="text" 
                                class="mx-2" 
                                id="formGroupExampleInput" 
                                ref={titleInputRef} 
                                onChange={(e) => setTitle(e.target.value)}/>
                            </td>     
                        </tr>
                        <tr>
                            <td class= "mx-2">Due Date</td>
                            <td>
                                <input 
                                type="text" 
                                class="mx-2" 
                                id="formGroupExampleInput"
                                ref={dueDateInputRef}
                                onChange={(e) => setDueDate(e.target.value)}
                                />
                            </td>         
                        </tr>
                        <tr>
                            <td class= "mx-2">Submitted Date</td>
                            <td>
                                <input 
                                type="text" 
                                class="mx-2" 
                                id="formGroupExampleInput"
                                ref={submittedDateInputRef}
                                onChange={(e) => setSubmittedDate(e.target.value)}
                                />
                            </td> 
                        </tr>
                        <tr>
                            <td class= "mx-2">Submission Status</td>
                            <td>
                                <input 
                                type="text" 
                                class="mx-2" 
                                id="formGroupExampleInput"
                                ref={submittionStatusInputRef}
                                onChange={(e) => setSubmittionStatus(e.target.value)} 
                                />
                            </td> 
                        </tr>
                </tbody>
            </table>
            </div>

        <form>
            <div class="form-group">
                
                <input 
                type="file" 
                class="file mx-5" 
                id="exampleFormControlFile1" 
                ref={fileInputRef}/>

                <button type="button" class="btn btn-success mx-5" onClick={addItem}>Upload</button>

                {/* 
                <button type="button" class="btn btn-secondary" onClick={() => viewItem(id)}>View</button>
                 */}
            </div>
        </form>
        
        
        <div className="items">
            {items &&
                items.map((item) => (
                <div className="item" key={item._id}>
                    
                    <h6>{item.moduleName}</h6>
                    <button
                    type="button"
                    class="btn btn-secondary mx-3"
                    onClick={() => 
                        viewItem(item._id)
                    }>
                        View File
                    </button>
                    <button 
                    type="button"
                    class="btn btn-danger"
                    onClick={() => 
                        deleteItem(item._id)
                    }>
                        Delete
                    </button>
                </div>
        ))}
        </div>



    </div>
    </>
  )
}

export default File
