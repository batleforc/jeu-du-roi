git_message=$(git log --oneline -n 1)
dock_message=$(docker logs akau)
messagefinal="\"GIT: "$git_message" \nDocker: "$dock_message" \nCI_URL: "$PROJECT_URL" \nUserWhoStart: "$USER_START" \""
messagefinal="GIT: 115ca68 HEAVY METAL \nDocker: app is listening on port 8080 \nCI_URL: https://gitlab.com/a-king-among-us/jeu-du-roi-ui/-/pipelines/202937679 \nUserWhoStart: maxLeriche.weebo "
echo $PROJECT_URL
echo $USER_START
echo $messagefinal
curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    --data "{
        \"embeds\":[
        {
            \"title\":\"Update du site de linterface du projet\",
            \"color\":\"707070\",
             \"url\":\"https://akau.weebo.fr/\",
             \"description\":$messagefinal
        }
    ]}" \
    $WEBHOOK_URL

git_message=$(git log --oneline -n 1)
dock_message=$(docker logs akau)
messagefinal='"GIT: '$git_message"\nDocker: "$dock_message"\nCI_URL:"$PROJECT_URL"\nUserWhoStart:"$USER_START'"'

curl -X POST \
    -H "Content-Type: application/json" \
    -d "{
        \"embeds\":[
        {
            \"title\":\"Update du site de linterface du projet\",
            \"color\":\"707070\",
            \"url\":\"https://akau.weebo.fr/\",
            \"description\":$messagefinal
        }
    ]}" \
    $WEBHOOK_URL