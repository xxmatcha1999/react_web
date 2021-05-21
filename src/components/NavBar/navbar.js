import React from 'react' ;
export default function navbar(){
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="http://localhost:3000/">Numerical method</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Root of Equation
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/Bisection">Bisection</a>
                    <a class="dropdown-item" href="/false_position">False position</a>
                    <a class="dropdown-item" href="/one_point">One Point</a>
                    <a class="dropdown-item" href="/newton_rap">Newton Raphson</a>
                    <a class="dropdown-item" href="/secant">Secant</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Matrix
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/cramer_rule">Cramer Rule</a>
                    <a class="dropdown-item" href="/Gauss_Elimination">Gauss Elimination</a>
                    <a class="dropdown-item" href="/Gauss_Jordan">Gauss Jordan</a>
                    <a class="dropdown-item" href="/lu_decomposition">Lu decomposition</a>
                    <a class="dropdown-item" href="/Jacobi_iteration">Jacobi Iteration</a>
                    <a class="dropdown-item" href="/Gauss_seidel">Gauss_seidel</a>
                    <a class="dropdown-item" href="/Conjugate_gradient">Conjugate_gradient</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Interpolation
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/Polynomial">Newton Interpolation</a>
                    <a class="dropdown-item" href="/lagrange">Lagrange</a>
                    <a class="dropdown-item" href="/Cubic_spline">Cubic_spline</a>
                    <a class="dropdown-item" href="/Linear_regression">Linear_regression</a>
                    <a class="dropdown-item" href="/Polynomial_regression">Polynomial_regression </a>
                    </div>
                </li>
                </ul>
            </div>
            </nav>
        </div>
    )
}