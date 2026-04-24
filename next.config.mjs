import nextra from 'nextra'

const withNextra = nextra({})

export default withNextra({
	reactStrictMode: true,
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'grails.app',
			},
		],
	},
})
