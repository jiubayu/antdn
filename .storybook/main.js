module.exports = {
    stories: [
        "../components/Introduction.stories.mdx",
        "../components/Install.stories.mdx",
        "../components/Components.stories.mdx",
        "../components/**/*.stories.mdx",
        "../components/**/*.stories.@(js|sx|ts|tsx)"
    ],
    addons: ['@storyook/addon-essentials']
}