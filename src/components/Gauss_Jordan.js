import React from 'react'
import '../css/Gauss_jordan.css'
import {Matrix} from './Matrix'
import { Button } from 'antd'
import axios from 'axios'
let apiUrl = "http://localhost:4040/data/matrix/Gauss_Jodan?key=45134Asd4864wadfad"
function Gauss_Jordan_cal(Matrix_in){

    let Matrix = [];
    for (let i = 0; i < Matrix_in.length; i++)
        Matrix[i] = Matrix_in[i].slice();
        


    for(let k = 0; k < Matrix.length-1; k++){

        for (let j = k; j < Matrix.length-1; j++){
    
            // copy array
            let temp = [];
            for (let i = 0; i < Matrix.length; i++)
                temp[i] = Matrix[i].slice();

            let tem = temp[k][k];
            for(let i = k; i < Matrix[0].length;i++){
               temp[k][i] = temp[k][i]/tem*temp[j+1][k];
               Matrix[j+1][i] = Matrix[j+1][i]-temp[k][i];
            }
        }

    }

    for(let k = 0; k < Matrix.length-1; k++){

        for (let j = 0+k; j < Matrix.length-1; j++){
        
            // copy array
            let temp = [];
            for (let i = 0; i < Matrix.length; i++)
                temp[i] = Matrix[i].slice();

            let tem = temp[Matrix.length-1-k][Matrix.length-1-k];
            for(let i = Matrix.length;i >= 0;i--){
                temp[Matrix.length-1-k][i] = temp[Matrix.length-1-k][i]/tem*temp[Matrix.length-1-(1+j)][Matrix.length-1-k];
                Matrix[Matrix.length-1-(1+j)][i] = Matrix[Matrix.length-1-(1+j)][i]-temp[Matrix.length-1-k][i];
            }

        }
    }
    
    let answer = [];

    for(let i =0;i < Matrix.length;i++){
        answer.push(Matrix[i][Matrix.length]/Matrix[i][i]);
    }

    return answer;
}

class Gauss_Jordan extends React.Component{

    state = {
        rows: 2,
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
        let answer = Gauss_Jordan_cal(this.state.Matrix)
        let data = [];
        for(let i =0;i < answer.length;i++){
            data.push(<div key={i}>X{i+1} : {answer[i]}</div>)
        }
        this.setState({X: data})
    }

    render(){
        return(
            <div >
                <h2 className='MakeButton'>Gauss Jordan</h2>
                <div className='MakeButton'>
                    <Button className='button_laout' type="primary" onClick={this.AddMatrix}>Add row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.DelMatrix}>Delete row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button className='button_laout' type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <div className='MakeMatrix'>
                <Matrix row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                </div>
                <div className='MakeMatrix'>{this.state.X}</div>
            </div>
            
        )
    }
}

export default Gauss_Jordan