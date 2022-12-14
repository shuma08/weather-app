import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutPage = () => {
	return (
		<>
			<Layout>
				<Content className="content-container">
					<Outlet />
				</Content>
			</Layout>

		</>
	)
}

export default LayoutPage