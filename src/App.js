import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu} from "antd";
import Bisection from "./components/Bisection.js"
import false_position from "./components/false_position"
import one_point from "./components/one_point"
import newton_rap from "./components/newton_rap"
import secant from "./components/secant"
import cramer from "./components/cramer_rule"
import Gauss_Elimination from "./components/Gauss_Elimination"
import Gauss_Jordan from "./components/Gauss_Jordan"
import Lu_decomposition from "./components/lu_decomposition"
import Jacobi_iteration from "./components/Jacobi_iteration"
import Gauss_seidel from "./components/Gauss_seidel"
import Conjugate_gradient from "./components/Conjugate_gradient"
import Polynomial from "./components/polynomial"
import lagrange from "./components/lagrange"
import Cubic_spline from "./components/Cubic_spline"
import Linear_regression from "./components/Linear_regression"
import Polynomial_regression from "./components/Polynomial_regression"
import SW from "./components/swagger"
import Navbar  from "./components/NavBar/navbar"


const { Header, Content,Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Navbar/>
          <Layout>
            <Content style={{
              }}>
              <Route  exact path="/Bisection" component={Bisection} />
              <Route  exact path="/false_position" component={false_position} />
              <Route  exact path="/one_point" component={one_point} />
              <Route  exact path="/newton_rap" component={newton_rap} />
              <Route  exact path="/secant" component={secant} />
              <Route  exact path="/cramer_rule" component={cramer} />
              <Route  exact path="/Gauss_Elimination" component={Gauss_Elimination} />
              <Route  exact path="/Gauss_Jordan" component={Gauss_Jordan} />
              <Route  exact path="/lu_decomposition" component={Lu_decomposition} />
              <Route  exact path="/Jacobi_iteration" component={Jacobi_iteration} />
              <Route  exact path="/Gauss_seidel" component={Gauss_seidel} />
              <Route  exact path="/Conjugate_gradient" component={Conjugate_gradient} />
              <Route  exact path="/Polynomial" component={Polynomial} />
              <Route  exact path="/lagrange" component={lagrange} />
              <Route  exact path="/Cubic_spline" component={Cubic_spline} />
              <Route  exact path="/Linear_regression" component={Linear_regression} />
              <Route  exact path="/Polynomial_regression" component={Polynomial_regression} />
              <Route exact path='/swagger' component={SW}></Route>
              
            </Content>
          </Layout>
        </Router>
    );
  }
}

export default App;

