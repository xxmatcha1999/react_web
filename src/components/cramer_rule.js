import React from 'react'
import { Button } from 'antd'
import {Matrix} from './Matrix'
import '../css/Cramer.css'
import axios from 'axios'
let apiUrl = "http://localhost:4040/data/matrix/cramer_rule?key=45134Asd4864wadfad"

class Cramer extends React.Component{

    state = {
        rows: 2,
        columns: 2,
        Matrix: [[],[]],
        X: [],
    }

    async gatdata() { // ฟังชั้นเรียก api
        try {

            const data = await axios.post(apiUrl).then(e => (
                e.data
            ))

            let row = data["row"];
            if(row > parseInt(this.state.rows)){
                let r = parseInt(this.state.rows);
                for(let i = r;i < row;i++){
                    this.AddMatrix();
                }
            }
            else{
                let r = parseInt(this.state.rows);
                for(let i = r;i > row;i--){
                    this.DelMatrix();
                }
            }

            this.setState({Matrix: data["Matrix"]})

          } catch (error) {
            this.setState({result : "Not Sync"})
          }

    }

    getdata_ = (e) => {
        this.gatdata();
    }

    Input = (e) =>{
        let arr = [];
        let Matrix = this.state.Matrix;
        arr = e.target.name.split(',');
        Matrix[parseInt(arr[0])][parseInt(arr[1])] = e.target.value;
        this.setState({Matrix: Matrix})
    }

    AddMatrix = (e) =>{
        let Matrix = this.state.Matrix;
        Matrix.push([]);
        this.setState({Matrix: Matrix})
        this.setState({rows: this.state.rows+1})
    }

    DelMatrix = (e) =>{
        if(this.state.rows > 2){
            let i;
            this.setState({rows: this.state.rows-1})
            let Matrix = this.state.Matrix;
            Matrix.pop();
            for(i = 0;i < Matrix.length;i++){
                Matrix[i].pop();
            }
            this.setState({Matrix: Matrix})
        }
    }

    Calculate = (e) =>{

        var math = require('mathjs');
        let Matrix_ = this.state.Matrix;
        let Matrix = [];
        let Answer = [];
        let rows = this.state.rows;
        rows = parseInt(rows);
        let i,j;

        for(i = 0;i < rows;i++){
            let tem = [];
            for(j = 0;j < rows;j++){
                tem.push(parseInt(Matrix_[i][j]));
            }
            Matrix.push(tem);
            Answer.push(parseInt(Matrix_[i][rows]));
        }

        let temp = [];
        for (i = 0; i < rows; i++)
                temp[i] = Matrix[i].slice();

        let Array_ = [];

        Array_.push(math.det(Matrix).toFixed(5));

        for(i = 0;i < rows;i++){
            for(j = 0;j < rows;j++){
                temp[j][i] =  Answer[j];
            }
            Array_.push(math.det(temp).toFixed(5));
            for(j = 0;j < rows;j++){
                temp[j][i] =  Matrix[j][i];
            }
        }

        let X = [];

        for(i = 0;i < rows; i++){
            X.push(Array_[i+1]/Array_[0]);
        }
        for(i = 0;i < rows; i++){
            X[i] = (<div  key={i}>X{i+1} : {X[i]}</div>);
        }

        this.setState({X: X});

    }

    render(){
        return(
            <div >
                <h2 className='MakeButton'>Cramer's Rule</h2>
                <div className='MakeButton'>
                    <Button className='button_laout' type="primary" onClick={this.AddMatrix}>Add row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.DelMatrix}>Delete row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button className='button_laout' type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <div className='MakeMatrix'>
                <Matrix  row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                </div>
                <h4 className='MakeButton'>{this.state.X}</h4>
            </div>
            
        )
    }
}

export default Cramer