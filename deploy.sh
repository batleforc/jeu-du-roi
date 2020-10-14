git_message=$(git log --oneline -n 1)
dock_message=$(docker logs akau)
messagefinal='GIT: '$git_message"\nDocker: "$dock_message"\nCI_URL:"$PROJECT_URL"\nUserWhoStart:"$USER_START
export WEBHOOK_URL="https://discordapp.com/api/webhooks/735175356054765618/MdOM3hDJPPEi1HBnCDJWhPQNK78-dOShV_mbu2dR4PfQfUZd_m0T3AMff670UMgqKCr4"
echo $messagefinal
curl -X POST \
    -H "Content-Type: application/json" \
    -d "{
        \"embeds\":[
        {
            \"title\":\"Update du site de linterface du projet\",
            \"color\":\"707070\",
            \"url\":\"https://akau.weebo.fr/\",
            \"description\":\"$messagefinal\"
        }
    ]}" \
    $WEBHOOK_URL