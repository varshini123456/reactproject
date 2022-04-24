import React from "react"
import "./SingleProduct.css"
import {makeStyles} from "@material-ui/core"

const useStyle = makeStyles({
    animated_title : {
        color: '#222',
        fontFamily: 'Roboto, Arial, sans-serif',
        height: '90vmin',
        left: '33%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vmin',
      },
      animated_title  : {
          div : {
        height: '50%',
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
          }
      },

      'animated_title > div div' : {
        fontSize: '12vmin',
        padding: '2vmin 0',
        position: 'absolute',
      },
      'animated_title > div div span' : {
        display: 'block',
      },
      'animated_title > div.textTop' : {
        borderBottom: '1vmin solid #000',
        top: 0,
      },
      'animated_title > div.textTop div' : {
        animation: 'showTopText 1s',
        animationDelay: '0.5s',
        animationFillMode: 'forwards',
        bottom: 0,
        transform: 'translate(0, 100%)',
      },
      'animated_title > div.textTop div span:first-child' : {
        color: '#767676',
      },
      'animated_title > div.textBottom' : {
        bottom: 0,
      },
      'animated_title > div.textBottom div' : {
        animation: 'showBottomText 0.5s',
        animationDelay: '1.75s',
        animationFillMode: 'forwards',
        top: 0,
        transform: 'translate(0, -100%)',
      },

      'animated_title > div.textTop div span:first-child' : {
        color: '#767676',
      },

      'animated_title > div.textBottom' : {
        bottom: 0,
      },

      'animated_title > div.textBottom div' : {
        animation: 'showBottomText 0.5s',
        animationDelay: '1.75s',
        animationFillMode: 'forwards',
        top: 0,
        transform: 'translate(0, -100%)',
      },
      
      
      
      
      ProductBody : {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
      },
      
      row :{
          float: 'right'
      },
      
      
      'col-2' : {
          width: '500px',
          height: '300px',
          marginRight: '80px',
      },
      
      'col-2 img' :{
          maxWidth: '100%',
          padding: '50px 0px',
      },
      
      col :{
          marginTop: '100px',
          paddingTop: '50px',
          marginLeft: '80px',
      },
      
      'col h1' :{
          fontSize: '50px',
          lineHeight: '60px',
          marginTop: '30px',
          marginLeft: '20px',
      },
      
      'col h3' :{
          marginTop: '20px',
          fontSize: '22px',
          fontWeight: 'bold',
      },
      
      'col h4' : {
          margin: '20px 0',
          fontSize: '22px',
          fontWeight: 'bold',
      },
      
      btn : {
          width: '120%',
          padding: '20px',
          borderRadius: '5px',
          background: 'none',
          border: '1px solid #383838',
          color: '#383838',
          fontSize: '20px',
          cursor: 'pointer',
          margin: '20px 0',
          textTransform: 'capitalize',
        },
      
      'cartBtn' : {
          marginRight: '2%',
          background: '#383838',
          color: '#fff',
        }
})

function SingleProduct(){
    const classes = useStyle();

    return (
        <>
            <div className={classes.ProductBody}>
                <div className={classes.row}>
                    <div className={classes.col-2}>
                        <img src="https://images.samsung.com/is/image/samsung/assets/in/smartphones/mobiles-by-camera/sm-m022gzadins.png?$720_N(384)_JPG$" id="ProductImg" style={{ width: "100%" }} />
                    </div>
                </div>


                <div className={classes.col}>

                    <div class={classes.animated_title}>
                        <div class={classes.textTop}>
                            <div>
                                <span>Mobiles</span>
                                <span>Samsung </span>
                                <span style={{float:"right"}}><p style={{color:"red",fontSize:".7em",marginLeft:"130%",marginTop:"-80px"}}>20000/-</p></span>
                            </div>
                        </div>
                        <div class={classes.textBottom}>
                            <div>
                                <h3>6GB Ram</h3>
                                <h3>64GB STORAGE</h3>
                                <h3>BLACK</h3>
                                <button className={`${classes.btn} ${classes.cartBtn}`}>ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default SingleProduct;