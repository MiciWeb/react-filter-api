import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import api from "./components/api.json";

class Legend extends React.Component {
    render() {
        return (
            <small><br />
                <i>
                    <span style={{ color: 'Red' }}>Red</span> mean out of stock
                </i>
            </small>
        )
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">
                    {this.props.category}
                </th>
            </tr>
        )
    }
}

class ProductRow extends React.Component {
    render() {
        const name = this.props.product.stocked ? this.props.product.name : <span style={{ color: 'red' }}>{this.props.product.name}</span>
        const price = this.props.product.price
        return (
            <tr>
                <td>{name}</td>
                <td>{price}</td>
            </tr>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText
        const inStockOnly = this.props.inStockOnly

        const rows = []
        let lastCategory = null

        this.props.products.forEach(product => {

            if (product.name.indexOf(filterText) === -1) {
                return
            }
            if (inStockOnly && !product.stocked) {
                return
            }

            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category} />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            )
            lastCategory = product.category
            console.log(product.category)
        })
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.handleFilterTextChange = e.target.value
    }
    
    render() {
        return (
            <div>
                <form>
                    <input
                        type="search"
                        placeholder="search"
                        value={this.props.FilterText}
                        onchange={this.props.handleFilterTextChange} />
                    <p>
                        <input
                            type="checkbox"
                            checked={this.props.inStockOnly} />
                        {" "}
                         Only show products in stock
                    </p>
                </form>
            </div>
        )
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: "",
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    handleFilterTextChange={this.handleFilterTextChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
                <Legend />
            </div>
        )
    }
}


const PRODUCTS = api;

ReactDOM.render(
    <Table products={PRODUCTS} />,
    document.getElementById('root')
);