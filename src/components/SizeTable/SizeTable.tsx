import React from "react";
import { Table } from "rsuite";
import Product from "../../classes/Product";
import { UserStateType } from "../../redux/user/types";
const { Column, HeaderCell, Cell } = Table;

interface Props {
    product: Product;
    user: UserStateType;
}

export default class SizeTable extends React.Component<Props> {
    render() {
        const product = this.props.product;
        const type = this.props.user.types.find((t) => t.type_name === product.type_name);

        if (type === undefined) return <p>該類別尚未設定尺寸</p>;
        else if (type.type_name !== "兩件式(內外)" && type.type_name !== "套裝(衣裙)") {
            const cols = type.type_sizecolumn.split(",");
            return (
                <Table data={product.infosize}>
                    <Column width={70} align="center" fixed>
                        <HeaderCell>尺寸</HeaderCell>
                        <Cell dataKey="尺寸" />
                    </Column>
                    {cols.map((col) => (
                        <Column width={70} align="center" fixed>
                            <HeaderCell>{col}</HeaderCell>
                            <Cell dataKey={col} />
                        </Column>
                    ))}
                </Table>
            );
        } else return <p>開發中</p>;
    }
}
