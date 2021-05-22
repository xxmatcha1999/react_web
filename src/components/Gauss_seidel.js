import React from 'react'
import {Matrix} from './Matrix'
import Jacobi_iteration from "./Jacobi_iteration"
import { Input } from 'antd';
import { Button } from 'antd'


import axios from 'axios'
let apiUrl = "http://localhost:4040/data/matrix/Gauss_seidel_interation?key=45134Asd4864wadfad"

class Gauss_seidel extends React.Component{

    state = {
        rows: 2,
        Matrix: [[],[]],
        X: [],
        ERROR: ''
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
                
            this.setState({Matrix: data["Matrix"],ERROR: data["error"]})

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

    getERR= (e) => {
        this.setState({
            ERROR: e.target.value,
        });
    };

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
        let temp = this.state.Matrix;

        // copy array
        let Matrix = [];
        for (let i = 0; i < temp.length; i++)
            Matrix[i] = temp[i].slice();

        let a =[];
        let b = [];
        let x = [];
        let error_ = [];

        for(let i=0;i< Matrix.length;i++){
            b.push(Matrix[i][Matrix.length])
            b[i] = parseFloat(b[i])
            a.push(Matrix[i])
            a[i].pop()
            for(let j = 0;j < Matrix.length;j++){
                a[i][j] = parseFloat(a[i][j])
            }
            x.push(1);
            error_.push(9999);
        }

        let answer = Jacobi_iteration(a,b,x,error_,parseFloat(this.state.ERROR));

        this.setState({X: answer});


    }
    render(){
        return(
            
            <div>                
                <h2 className='MakeButton'>Gauss Seidel</h2>
                <div className='MakeButton'>
                    <Button className='button_laout' type="primary" onClick={this.AddMatrix}>Add row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.DelMatrix}>Delete row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button className='button_laout' type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <div className="MakeButton">
                    ERROR :
                    <input onChange={this.getERR} className="MakeMatrix" value={this.state.ERROR}/>
                </div>
                <div className='MakeMatrix'>
                <Matrix row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                </div>
                <div className='Matrix'>{this.state.X}</div>
            </div>
            
        )
    }
}

export default Gauss_seidel;