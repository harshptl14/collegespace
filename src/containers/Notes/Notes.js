import React from "react";
import classes from "./Notes.module.css"
import i1 from "./../../assets/Images/1-.png"
import i2 from "./../../assets/Images/2-.png"
import i3 from "./../../assets/Images/3-.png"

const Notes = () => {
    return (
        <div>
            <h2>Notes</h2><br></br>
            <br></br>
            <a href="first.html"></a>
            <div className={classes.cardcontainer}>
                <div className={classes.card}>
                    <img src={i1}></img>
                    <div className={classes.container}>
                        <h5>Title One</h5><br />
                        <hr />
                        <br />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation.</p><br /><br />
                    </div><br />
                </div>
                <div className={classes.card}>
                    <img src={i2} />
                    <div className={classes.container}>
                        <h5>Title Two</h5><br />
                        <hr />
                        <br />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation.</p><br /><br />
                    </div><br />
                </div>
                <div className={classes.card}>
                    <img src={i3} />
                    <div className={classes.container}>
                        <h5 >Title Three</h5><br />
                        <hr />
                        <br />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
					quis nostrud exercitation.</p><br /><br />
                    </div><br />
                </div>
            </div><br></br><br></br><br></br>
        </div>
    );
}

export default Notes