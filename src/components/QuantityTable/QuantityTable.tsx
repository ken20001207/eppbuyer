import React from "react";
import { Table } from "rsuite";
import Product from "../../classes/Product";
const { Column, HeaderCell, Cell } = Table;

interface Props {
    product: Product;
}

export default class QuantityTable extends React.Component<Props> {
    render() {
        const product = this.props.product;
        const cols = product.sizes;
        return (
            <Table data={product.purchase_qty}>
                <Column width={70} align="center" fixed>
                    <HeaderCell>顏色</HeaderCell>
                    <Cell dataKey="顏色" />
                </Column>
                {cols.map((col) => (
                    <Column width={70} align="center" fixed>
                        <HeaderCell>{col}</HeaderCell>
                        <Cell dataKey={col} />
                    </Column>
                ))}
            </Table>
        );
    }
}
