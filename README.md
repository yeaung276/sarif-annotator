# sarif-annotator 
[![MegaLinter](https://github.com/yeaung276/sarif-annotator/workflows/MegaLinter/badge.svg?branch=main)](https://github.com/yeaung276/sarif-annotator/actions?query=workflow%3AMegaLinter+branch%3Amain)
<br>
This workflow is meant to work with code analyzer in the MegaLinter. This will read combined SARIF report and anotate the outputed problem in the file change section of the pull request. Report of analyzer that do not produce SARIF output will not work with this workflow.
Example.
```yml
- name: Annotation
    if: ${{ success() }} || ${{ failure() }}
    uses: yeaung276/sarif-annotator@1.0.0
    with: 
        sarif_path: 'megalinter-reports/megalinter-report.sarif'
```
