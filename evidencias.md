   1  aws sts get-caller-identity --region us-east-1
   2  cd proyecto-web/
   3  aws sts get-caller-identity --region us-east-1
   4  terraform init
   5  terraform apply
   6  aws s3 ls
   7  aws s3 website s3://bucket-challenge-musica-01/ --index-document index.html
   8  aws s3api put-public-access-block --bucket bucket-challenge-musica-01 --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
   9  cat <<EOF > policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::nombre-de-tu-bucket-unico/*"
        }
    ]
}
EOF

   10  aws s3api put-bucket-policy --bucket bucket-challenge-musica-01 --policy file://policy.json
   11  aws s3api put-bucket-policy --bucket bucket-challenge-musica-01 --policy file://policy.json
   12  aws s3 sync . s3://bucket-challenge-musica-01/