import React from 'react'
import { Input } from 'antd'
import '../css/Matrix.css'

class Matrix extends React.Component{

    createMatrix(){
        let arrMatrix = []
        for(let i=0;i<this.props.row;i++){
            for(let j=0;j<this.props.row+1;j++){
                arrMatrix.push(<Input className='matrix' name={i.toString()+','+j.toString()} onChange={this.props.onChange} value={this.props.value[i][j]}/>)
            }
            arrMatrix.push(<div></div>)
        }
        return arrMatrix
    }

    render(){
        return(
            <div>
                {this.createMatrix()}
            </div>
        )
    }
}

class Matrix2Input extends React.Component{

    createMatrix(){
        let arrMatrix = []
        for(let i=0;i<this.props.row;i++){
            for(let j=0;j<2;j++){
                arrMatrix.push(<Input className='matrix' name={i.toString()+','+j.toString()} onChange={this.props.onChange} value={this.props.value[i][j]}/>)
            }
            arrMatrix.push(<div></div>)
        }
        return arrMatrix
    }

    render(){
        return(
            <div>
                {this.createMatrix()}
            </div>
        )
    }
}

export {Matrix,Matrix2Input}