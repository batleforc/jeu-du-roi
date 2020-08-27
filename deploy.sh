git pull
docker container stop akau
docker container rm akau
docker build -t batlefroc/akau .
docker run -p 8081:8080 -d --network weebo --name akau batlefroc/akau 
docker network connect weebo akau
sleep 2s
docker logs akau

git_message=$(git log --oneline -n 1)
dock_message=$(docker logs akau)
messagefinal='"GIT: '$git_message"\nDocker: "$dock_message'"'
export WEBHOOK_URL="https://discordapp.com/api/webhooks/735175356054765618/MdOM3hDJPPEi1HBnCDJWhPQNK78-dOShV_mbu2dR4PfQfUZd_m0T3AMff670UMgqKCr4"

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