import React from 'react'
import '../css/Gauss_Elimina.css'
import { Input } from 'antd'
import { Button } from 'antd'
import {Matrix} from './Matrix'

import axios from 'axios'
let apiUrl = "http://localhost:4040/data/matrix/Gauss_Elimination_Method?key=45134Asd4864wadfad"

class Gauss_Elimination extends React.Component{

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

    MakeMatrix = (e) => {
        let rows = this.state.rows;
        rows = parseInt(rows);
        let columns = this.state.columns;
        columns = parseInt(columns);

        let wow = [];
        let i,j
        for(i= 0;i < rows;i++){
            for(j = 0; j < columns+1;j++){
                wow.push(<span className="MyInput"><Input name={i.toString()+','+j.toString()} onChange={this.Getvalue} className="Input_2" style={{margin: '5px'}} value={this.state.Matrix[i][j]}/></span>)
            }
            wow.push(<div></div>)
        }
        // console.log(wow)
        return(wow);
    }

    Calculate = (e) =>{

        let Matrix = this.state.Matrix;
        let rows = this.state.rows;
        rows = parseInt(rows);
        let columns = this.state.columns;
        columns = parseInt(columns);

        // make to fload
        let i,j,k,ss
        for(i = 0 ;i < rows;i++){
            for(j = 0;j < columns+1;j++){
                Matrix[i][j] = parseFloat(Matrix[i][j])
            }
        }

        for(k = 0; k < 2; k++){

            for (j = k; j < Matrix.length-1; j++){
        
                // copy array
                var temp = [];
                for (i = 0; i < Matrix.length; i++)
                    temp[i] = Matrix[i].slice();
    
                let tem = temp[k][k];
                for(i = k; i < Matrix[0].length;i++){
                   temp[k][i] = temp[k][i]/tem*temp[j+1][k];
                   Matrix[j+1][i] = Matrix[j+1][i]-temp[k][i];
                }
    
            }
            
        }

        let aw = [];
        for(i = 0;i <rows;i++){
            aw.push(0);
        }

        for(i = rows-1;i >= 0;i--){
            ss = 0;
            for(j = 0; j < rows;j++){
                if(i !== j){
                    ss = ss-(aw[j]*Matrix[i][j]);
                }
            }
            aw[i] = ((Matrix[i][rows]+ss)/Matrix[i][i]);
        }

        let data = [],result;

        for( i = 0;i < rows;i++){
            result = aw[i]
            data.push(<div  key={i}> X{i+1} : {result}</div>)
        }

        this.setState({X: data})
    }

    render(){
        return(
            <div >
                <h2 className='MakeButton'>Gauss Elimination</h2>
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

export default Gauss_Elimination