import React from 'react';

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'


const data = {
    "swagger": "2.0",
    "info": {
        "description": "ดีง้าบบบบ",
        "title": "Numerical Method"
    },
    "host": "localhost:4040/data",
    "tags": [
        {
            "name": "Root of Equation",
            "description": "โจทย์ Root of Equation",
        },
        {
            "name": "Matrix",
            "description": "โจทย์ Matrix",
        }
        ,
        {
            "name": "interpolation",
            "description": "โจทย์ interpolation",
        }
    ],
    "schemes": [
        "http"
    ],
    
    "paths": {
        "/root?key=45134Asd4864wadfad": {
            "post": {
                "tags": [
                    "Root of Equation"
                ],
                "summary": "แสดงข้อมูลทั้งหมด",
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    },
                    "404": {
                        "description": "ทำงานไม่สำเร็จ"
                    }
                }
            }
        },
        "/root/{name}?key=45134Asd4864wadfad": {
            "post": {
                "tags": [
                    "Root of Equation"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Root of Equation",
                "parameters": [
                    {
                        "name": "name",
                        "in": "path",
                        "description": "ชื่อของ method",
                        "required": false,
                        "type": "string",
                        "format": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    }
                }
            }
        },
        "/matrix?key=45134Asd4864wadfad": {
            "post": {
                "tags": [
                    "Matrix"
                ],
                "summary": "แสดงข้อมูลทั้งหมด",
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    },
                    "404": {
                        "description": "ทำงานไม่สำเร็จ"
                    }
                }
            }
        },
        "/matrix/{name}?key=45134Asd4864wadfad": {
            "post": {
                "tags": [
                    "Matrix"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง Matrix",
                "parameters": [
                    {
                        "name": "name",
                        "in": "path",
                        "description": "ชื่อของ method",
                        "required": false,
                        "type": "string",
                        "format": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    }
                }
            }
        },
        "/interpolation?key=45134Asd4864wadfad": {
            "post": {
                "tags": [
                    "interpolation"
                ],
                "summary": "แสดงข้อมูลทั้งหมด",
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    },
                    "404": {
                        "description": "ทำงานไม่สำเร็จ"
                    }
                }
            }
        },
        "/interpolation/{name}?key=45134Asd4864wadfad": {
            "post": {
                "tags": [
                    "interpolation"
                ],
                "summary": "ค้นหาโจทย์ทั้งหมดในเรื่อง interpolation",
                "parameters": [
                    {
                        "name": "name",
                        "in": "path",
                        "description": "ชื่อของ method",
                        "required": false,
                        "type": "string",
                        "format": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "ทำงานสำเร็จ"
                    }
                }
            }
        }
    }
}

class swagger extends React.Component{
    render(){
        return(
            <div><SwaggerUI spec={data} /></div>
        );
    }
}
export default swagger