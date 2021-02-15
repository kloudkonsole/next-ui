/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'umi';
import { Table } from 'antd';
import useSKUDataSource from '@/pages/op/sku/dataSource.js';

const columns = [{
	title: 'ID',
	dataIndex: ['d', 'id'],
	key: 'id'
}, {
	title: 'Reference',
	dataIndex: ['d','ref'],
	key: 'ref'
}, {
	title: 'State',
	dataIndex: ['d','state'],
	key: 'state'
}, {
	title: 'Organization',
	dataIndex: ['d','org'],
	key: 'org'
}];

const SKUPage = (props) => {
	const dataSource = useSKUDataSource(props)

	return <Table dataSource={dataSource} columns={columns} rowKey='i' />;
}

export default connect(({ sku }) => ({
  skuModel: sku,
}))(SKUPage);