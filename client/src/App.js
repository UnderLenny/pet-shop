import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar'
import { check } from './http/userAPI'
import { Context } from './index'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await check()
				user.setUser(true)
				user.setIsAuth(true)
			} catch (error) {
				console.error('Error checking user:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [user])

	if (loading) {
		return <Spinner animation='grow' />
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	)
})

export default App
