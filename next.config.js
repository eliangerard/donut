/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['esxjkvrtdgmcwzmxnbgu.supabase.co', 'lh3.googleusercontent.com'],
    },
    webpack: (config) => { config.externals.push({ sharp: 'commonjs sharp', canvas: 'commonjs canvas' }); return config }
}

module.exports = nextConfig
