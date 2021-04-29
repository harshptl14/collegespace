import classes from "../AddPosts/AddPosts.module.css";
import React, { Component } from "react";
import BasicPadding from "../../../components/UI/BasicCompPadding/BasicLayout";
import Textfield from "../../../components/UI/TextFormField/Textfield";
import firebase from "../../../config/config";
import Loader from "../../../components/UI/Loader/Loader";
import GeneralModal from "../../../components/UI/GeneralModal/GeneralModal";

// This class is used for uploading notes
export class AddNotes extends Component {
  file = {};
  deptCspit = ["ce", "it"];
  deptDep = ["ce", "cs", "it"];
  currentDate = new Date();
  db = firebase.firestore();
  subjectCe = ["toc", "dwdm", "ins", "ios", "pip"];
  subjecIt = ["crns", "se", "mla", "wcmc", "hs"];
  subjecCse = ["se","crns","ml","iot","hs"]
  storageRef = firebase.storage();
  constructor(props) {
    super(props);
    this.state = {
      article: {
        title: "",
        desc: "",
        createDate: this.currentDate,
        categoryLable: "",
        id: "",
        link: "",
        college: "",
        department: "",
        semester: "",
        subject: "",
        author: "",
      },
      error: "",
      opt: [6],
      dept: [],
      sub: [],
      loaderDisplay: false,
    };
  }

  // This returns a callback when a files successfully uploaded to the storage  
  uploadNoteCallBack = () => {
    return new Promise(async (resolve, reject) => {
      // file = e.target.files[0];
      const filename = this.file.name;
      // uuidv4();
      this.storageRef
        .ref()
        .child("pdf/" + filename)
        .put(this.file)
        .then(async (snapshot) => {
          const downloadURL = await this.storageRef
            .ref()
            .child("pdf/" + filename)
            .getDownloadURL();
          console.log(downloadURL);
          resolve({
            success: true,
            data: { link: downloadURL },
          });
        });
    });
  };

  // This recivies promise from uploadNotesCallback and returns a new promise
  callBk = () => {
    return new Promise(async (resolve, reject) => {
      const uploadState = await this.uploadNoteCallBack();
      if (uploadState.success) {
        console.log("In Upload Success State");
        console.log(uploadState.data.link);
        this.setState({
          hasFeatureIamge: true,
          article: {
            ...this.state.article,
            link: uploadState.data.link,
          },
        });
      }
      resolve({ success: true });
    });
  };

  // This function checks validation of the article
  handleValidation() {
    return new Promise(async (resolve, reject) => {
      const {
        title,
        desc,
        semester,
        subject,
        department,
        college,
        link,
        author,
      } = this.state.article;
      if (desc == "") {
        this.setState({
          error: "DESC is not valid",
        });
      } else if (title == "") {
        this.setState({ error: "title is not valid" });
      } else if (author == "") {
        this.setState({ error: "Author is not valid" });
      } else if (semester == "") {
        this.setState({ error: "semester is not valid" });
      } else if (subject == "") {
        this.setState({ error: "subject is not valid" });
      } else if (department == "") {
        this.setState({ error: "department is not valid" });
      } else if (college == "") {
        this.setState({ error: "college is not valid" });
      } else {
        this.setState({
          loaderDisplay: true,
        });
        await this.callBk();
        if (link == "") {
          this.setState({ error: "Adding pdf is Mandatory!" });
        }
        this.uploadNotes();
      }
    });
  }

  // If the article if valid this function will upload it to the firebase
  uploadNotes = () => {
    this.setState({ error: "" });
    let id = this.state.article.title;
    const article = this.state.article;
    id = id.split(" ").join("-");
    article.id = id;
    console.log(id);
    this.db.collection("academics")
      .doc(this.state.article.college)
      .collection("department")
      .doc(this.state.article.department)
      .collection("sem")
      .doc(this.state.article.semester)
      .collection("subjects")
      .doc(this.state.article.subject)
      .collection("notes")
      .doc(id)
      .set(article)
      .then((res) => {
        this.file = "";
        this.setState({
          article: {
            title: "",
            desc: "",
            createDate: this.currentDate,
            categoryLable: "",
            id: "",
            link: "",
            college: "",
            department: "",
            semester: "",
            subject: "",
            author: "",
          },
          error: "",
          opt: [6],
          dept: [],
          sub: [],
          loaderDisplay: false,
        });
        console.log(res);
        alert("Your notes has been successfully uploaded 👍");
      })
      .catch((err) => console.log(err));
  };

  //This function is used to add file to website
  addFile = (e) => {
    this.file = e.target.files[0];
    this.setState({});
  };

  //This function is used to update Title
  onChangeArticleTitle = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        title: value,
      },
    });
  };

  //This function is used to update Description
  onChangeArticleDesc = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        desc: value,
      },
    });
  };

  //This function is used to update Author
  onChangeArticleAuthor = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        author: value,
      },
    });
  };

  //This function is used to update Link
  onChangeArticleLink = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        link: value,
      },
    });
  };

  //This function is used to update College
  onChangeCollege = (value) => {
    if (value == "cspit") {
      this.setState({
        dept: this.deptCspit,
      });
      console.log("dept:" + this.state.dept);
    } else if (value == "depstar") {
      this.setState({
        dept: this.deptDep,
      });
    }

    this.setState({
      article: {
        ...this.state.article,
        college: value,
      },
    });
    console.log(this.state.article);
  };

  //This function is used to update Department
  onChangeDep = (value) => {
    if (value == 'ce') {
      this.setState({
        sub: this.subjectCe
      })
    }
    this.setState({
      article: {
        ...this.state.article,
        department: value,
      },
    });
    console.log(this.state.article);
  };

  //This function is used to update Semester
  onChangeSem = (value) => {
    if (value == 6 && this.state.article.department == "ce") {
      this.setState({
        sub: this.subjectCe,
      });
      console.log(value + " " + this.subject);
    } else if (value == 6 && this.state.article.department == "it") {
      this.setState({
        sub: this.subjecIt,
      });
    } else if( value == 6 && this.state.article.department == "cs") {
      this.setState({
        sub: this.subjecCse,
      });
    }

    this.setState({
      article: {
        ...this.state.article,
        semester: value,
      },
    });
    console.log(this.state.sub);
  };

  //This function is used to update Subject
  onChangeSub = (value) => {
    this.setState({
      article: {
        ...this.state.article,
        subject: value,
      },
    });
    console.log(this.state.article);
  };

  render() {
    console.log(this.file);
    return (
      <BasicPadding>
        {this.state.loaderDisplay ? (
          <GeneralModal>
            <Loader />
          </GeneralModal>
        ) : (
          <div></div>
        )}
        {this.state.error !== "" ? (
          <span style={{ color: "red" }}>{this.state.error}</span>
        ) : (
          ""
        )}
        <h1>Add Notes</h1>
        <div className={classes.col}>
          <div className={classes.basicInput}>
            <Textfield
              value={this.state.article.title}
              onChange={(e) => this.onChangeArticleTitle(e.target.value)}
              title="Title"
            />
            <Textfield
              value={this.state.article.desc}
              onChange={(e) => this.onChangeArticleDesc(e.target.value)}
              title="Description"
            />
            <Textfield
              value={this.state.article.author}
              onChange={(e) => this.onChangeArticleAuthor(e.target.value)}
              title="Author"
            />
            <label className={classes.label}>College</label>
            <select
              value={this.state.article.college}
              className={classes.select}
              onChange={(e) => this.onChangeCollege(e.target.value)}
            >
              <option value="" disabled selected>
                Select
              </option>
              <option name="cspit">cspit</option>
              <option name="depstar">depstar</option>
            </select>

            <label className={classes.label}>Department</label>
            <select
              value={this.state.article.department}
              className={classes.select}
              onChange={(e) => this.onChangeDep(e.target.value)}
            >
              <option value="" disabled selected>
                Select
              </option>
              {this.state.dept.map((e) => {
                return <option name={e}>{e}</option>;
              })}
            </select>
            <label className={classes.label}>Semester</label>
            <select
              value={this.state.article.semester}
              className={classes.select}
              onChange={(e) => this.onChangeSem(e.target.value)}
            >
              <option value="" disabled selected>
                Select
              </option>
              {this.state.opt.map((e) => {
                return <option name={e}>{e}</option>;
              })}
            </select>

            <label className={classes.label}>Subject</label>
            <select
              value={this.state.article.subject}
              className={classes.select}
              onChange={(e) => this.onChangeSub(e.target.value)}
            >
              <option value="" disabled selected>
                Select
              </option>
              {this.state.sub.map((e) => {
                return <option name={e}>{e}</option>;
              })}
            </select>
            <button
              onClick={(e) => this.handleValidation(e)}
              className={classes.cardbutton}
            >
              Submit
            </button>
          </div>

          <div className={classes.drag_area}>
            <div className={classes.icon}>
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <header>Select pdf or doc file</header>

            <label for="fileImage" className={classes.btn}>
              choose notes
            </label>

            <input
              className={classes.filechossen}
              id="fileImage"
              type="file"
              onChange={(e) => {
                this.addFile(e);
              }}
            ></input>
            <div>{this.file.name}</div>
          </div>
        </div>
      </BasicPadding>
    );
  }
}

export default AddNotes;
