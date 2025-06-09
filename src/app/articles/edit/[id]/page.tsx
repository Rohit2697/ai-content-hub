import EditArticleCmp from "@/components/EditArticleCmp"

interface EditArticleProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditArticle(props: EditArticleProps) {
    const { id } = await props.params
    return <EditArticleCmp id={id} />
}