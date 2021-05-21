import React from 'react'
import {Matrix} from './Matrix'

import { Button } from 'antd'

import axios from 'axios'
let apiUrl = "http://localhost:4040/data/matrix/Lu_decomposition_method?key=45134Asd4864wadfad"

function identityMatrix(n) {
    var matrix = [];

    for (var i = 0; i < n; i++) {
        matrix.push([]);
        for (var j = 0; j < n; j++) {
            matrix[i][j] = (i === j) ? 1 : 0;
        }
    }

    return matrix;
}

function emptyMatrix(n, m) {
    var matrix = [];
    m = m || n;

    for (var i = 0; i < n; i++) {
        matrix.push([]);
        for (var j = 0; j < m; j++) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
}

function matrixMultiply(A, B) {
    var C = [],
        j, k, sum, i;

    for (j = 0; j < A.length; j++) {
        C[j] = [];
        for (k = 0; k < B[0].length; k++) {
            sum = 0;
            for (i = 0; i < B.length; i++) {
                sum += B[i][k] * A[j][i];
            }
            C[j].push(sum);
        }
    }

    return C;
}

export function Lu_decomposition_cal(A, b, usePivoting) {

    var m = A.length,
        L = emptyMatrix(m),
        U = [...A],
        P = identityMatrix(m),
        x = [],
        y = [],
        currentRow, pivotRow, rowToKill, column, factor, maximumValue, maximumRow, pivotValue, partialP, sum;

    // factorize A = L * U
    for (currentRow = 0; currentRow < m; currentRow++) {

        if (usePivoting) {

            // determinte row with maximum pivot element
            for (maximumValue = 0, maximumRow = currentRow, pivotRow = currentRow; pivotRow < m; pivotRow++) {

                pivotValue = Math.abs(U[pivotRow][currentRow]);

                if (pivotValue > maximumValue) {
                    maximumValue = pivotValue;
                    maximumRow = pivotRow;
                }
            }

            // swap rows
            partialP = identityMatrix(m);
            partialP[currentRow][currentRow] = 0;
            partialP[maximumRow][maximumRow] = 0;
            partialP[maximumRow][currentRow] = 1;
            partialP[currentRow][maximumRow] = 1;

            P = matrixMultiply(partialP, P);
            U = matrixMultiply(partialP, U);
            L = matrixMultiply(partialP, L);

        }

        L[currentRow][currentRow] = 1;

        for (rowToKill = currentRow + 1; rowToKill < m; rowToKill++) {

            factor = U[rowToKill][currentRow] / U[currentRow][currentRow];
            L[rowToKill][currentRow] = factor;

            for (column = currentRow; column < m; column++) {
                U[rowToKill][column] -= U[currentRow][column] * factor;
            }
        }
    }

    if (b) {
        // adjust b
        if (usePivoting) {
            b = b.map(function (element) {
                return [element];
            });
            b = matrixMultiply(P, b);
            b = b.map(function (element) {
                return element[0];
            });
        }

        // forward substitute L * y = b
        for (currentRow = 0; currentRow < m; currentRow++) {

            for (sum = 0, column = 0; column < currentRow; column++) {
                sum += L[currentRow][column] * y[column];
            }

            y[currentRow] = b[currentRow] - sum;
        }

        // backward substitute U * x = y
        for (currentRow = m - 1; currentRow >= 0; currentRow--) {

            for (sum = 0, column = currentRow + 1; column < m; column++) {
                sum += U[currentRow][column] * x[column];
            }

            x[currentRow] = (y[currentRow] - sum) / U[currentRow][currentRow];
        }
    }

    return {
        L: L,
        U: U,
        P: P,
        x: x,
        y: y,
    };
}


class Lu_decomposition extends React.Component{

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
        let temp = this.state.Matrix;

        // copy array
        let Matrix = [];
        for (let i = 0; i < temp.length; i++)
            Matrix[i] = temp[i].slice();

        let a =[];
        let b = [];

        for(let i=0;i< Matrix.length;i++){
            b.push(Matrix[i][Matrix.length])
            b[i] = parseFloat(b[i])
            a.push(Matrix[i])
            a[i].pop()
            for(let j = 0;j < Matrix.length;j++){
                a[i][j] = parseFloat(a[i][j])
            }
        }
        let answer = Lu_decomposition_cal(a,b,true)
        let data = [];
        for(let i =0;i < answer.x.length;i++){
            data.push(<div key={i}>X{i+1} : {answer.x[i]}</div>)
        }
        this.setState({X: data})


    }

    render(){
        return(
            <div className='allincompro'>
                <h2 className='MakeButton'>Lu Decomposition</h2>
                <div className='MakeButton'>
                    <Button className='button_laout' type="primary" onClick={this.AddMatrix}>Add row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.DelMatrix}>Delete row/column</Button>
                    <Button className='button_laout' type="primary" onClick={this.Calculate}>Calculate</Button>
                    <Button className='button_laout' type="primary" onClick={this.getdata_} >Get example</Button>
                </div>
                <div className='MakeMatrix'>
                <Matrix row={this.state.rows} onChange={this.Input} value={this.state.Matrix}/>
                </div>
                <div className='Matrix'>{this.state.X}</div>
            </div>
            
        )
    }
}

export default Lu_decomposition