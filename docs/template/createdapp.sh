#!/bin/bash

mkdir ./dapp-$1

create_md () {
    gsed -e "s/DAPP/$1/" -e "s/ID/$2/" -e "s/TITLE/$3/" -e "s/SLUG/$4/" ./template/template.md > ./dapp-$1/$1$2.md
}

create_md $1 1 $2 ""
create_md $1 2 Design design
create_md $1 3 Prerequisites prerequisites
create_md $1 4 "Use case" usecase
create_md $1 5 "Technical guide" presentation
create_md $1 6 "Contract Origination" origination
create_md $1 7 Interactions interactions
create_md $1 8 Interface interface
create_md $1 9 Implementation implementation
