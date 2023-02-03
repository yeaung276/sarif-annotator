export const json = {
    "$schema": "https://schemastore.azurewebsites.net/schemas/json/sarif-2.1.0-rtm.5.json",
    "properties": {
        "comment": "Generated by MegaLinter",
        "docUrl": "https://megalinter.io/6.18.0",
        "dockerImage": {
            "buildDate": "2023-01-07T10:05:11Z",
            "buildRevision": "8fd433c",
            "buildVersion": "v6.18.0",
            "flavor": "all",
            "singleLinter": ""
        }
    },
    "runs": [
        {
            "artifacts": [
                {
                    "location": {
                        "uri": "file://.eslintrc.json"
                    }
                },
                {
                    "location": {
                        "uri": "file://package.json"
                    }
                },
                {
                    "location": {
                        "uri": "file://tsconfig.json"
                    }
                }
            ],
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/json_eslint_plugin_jsonc",
                    "linterKey": "JSON_ESLINT_PLUGIN_JSONC",
                    "linterVersion": "2.6.0"
                }
            },
            "results": [],
            "tool": {
                "driver": {
                    "informationUri": "https://eslint.org",
                    "name": "ESLint (MegaLinter JSON_ESLINT_PLUGIN_JSONC)",
                    "rules": [],
                    "version": "8.31.0"
                }
            }
        },
        {
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/repository_checkov",
                    "linterKey": "REPOSITORY_CHECKOV",
                    "linterVersion": "2.1.244"
                }
            },
            "results": [],
            "tool": {
                "driver": {
                    "informationUri": "https://checkov.io",
                    "name": "Checkov (MegaLinter REPOSITORY_CHECKOV)",
                    "organization": "bridgecrew",
                    "rules": [],
                    "version": "2.1.244"
                }
            }
        },
        {
            "columnKind": "utf16CodeUnits",
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/repository_devskim",
                    "linterKey": "REPOSITORY_DEVSKIM",
                    "linterVersion": "0.7.101"
                }
            },
            "results": [
                {
                    "level": "error",
                    "locations": [
                        {
                            "physicalLocation": {
                                "artifactLocation": {
                                    "uri": "lib/index.js"
                                },
                                "region": {
                                    "charLength": 18,
                                    "charOffset": 71322,
                                    "endColumn": 35,
                                    "endLine": 1829,
                                    "snippet": {
                                        "rendered": {
                                            "markdown": "`rejectUnauthorized`",
                                            "text": "rejectUnauthorized"
                                        },
                                        "text": "rejectUnauthorized"
                                    },
                                    "sourceLanguage": "javascript",
                                    "startColumn": 17,
                                    "startLine": 1829
                                }
                            }
                        }
                    ],
                    "message": {
                        "text": "Disabled certificate validation"
                    },
                    "properties": {
                        "DevSkimSeverity": 1,
                        "tags": [
                            "Cryptography.Certificate.Validation"
                        ]
                    },
                    "ruleId": "DS125134"
                }
            ],
            "tool": {
                "driver": {
                    "fullName": "Microsoft DevSkim Command Line Interface",
                    "informationUri": "https://megalinter.io/6.18.0/descriptors/repository_devskim",
                    "name": "devskim (MegaLinter REPOSITORY_DEVSKIM)",
                    "rules": [
                        {
                            "defaultConfiguration": {
                                "level": "error"
                            },
                            "fullDescription": {
                                "text": "Extend default certificate validation, but do not disable or override default rules."
                            },
                            "help": {
                                "markdown": "Visit [https://github.com/Microsoft/DevSkim/blob/main/guidance/DS114352.md](https://github.com/Microsoft/DevSkim/blob/main/guidance/DS114352.md) for guidance on this issue.",
                                "text": "Extend default certificate validation, but do not disable or override default rules."
                            },
                            "helpUri": "https://github.com/Microsoft/DevSkim/blob/main/guidance/DS114352.md",
                            "id": "DS125134",
                            "name": "Disabled certificate validation"
                        }
                    ],
                    "version": "0.7.101+7d74268320"
                }
            }
        },
        {
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/repository_dustilock",
                    "linterKey": "REPOSITORY_DUSTILOCK",
                    "linterVersion": "0.0.0"
                }
            },
            "results": [],
            "tool": {
                "driver": {
                    "informationUri": "https://github.com/Checkmarx/dustilock",
                    "name": "dustilock (MegaLinter REPOSITORY_DUSTILOCK)",
                    "rules": [
                        {
                            "id": "PACKAGE_JSON_ERROR",
                            "name": "Error in package.json",
                            "shortDescription": {
                                "text": "Dependency injection in package.json"
                            }
                        },
                        {
                            "id": "PYTHON_REQUIREMENT_ERROR",
                            "name": "Error in Python requirements",
                            "shortDescription": {
                                "text": "Dependency injection in python requirements.txt"
                            }
                        },
                        {
                            "id": "OTHER_ERROR",
                            "name": "Other errors",
                            "shortDescription": {
                                "text": "Other error"
                            }
                        }
                    ],
                    "version": "0.0.0"
                }
            }
        },
        {
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/repository_gitleaks",
                    "linterKey": "REPOSITORY_GITLEAKS",
                    "linterVersion": "8.15.2"
                }
            },
            "results": [],
            "tool": {
                "driver": {
                    "informationUri": "https://megalinter.io/6.18.0/descriptors/repository_gitleaks",
                    "name": "gitleaks (MegaLinter REPOSITORY_GITLEAKS)",
                    "rules": [],
                    "semanticVersion": "v8.0.0",
                    "version": "8.15.2"
                }
            }
        },
        {
            "artifacts": [],
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/repository_secretlint",
                    "linterKey": "REPOSITORY_SECRETLINT",
                    "linterVersion": "6.0.2"
                }
            },
            "results": [],
            "tool": {
                "driver": {
                    "informationUri": "https://github.com/secretlint/secretlint",
                    "name": "secretlint (MegaLinter REPOSITORY_SECRETLINT)",
                    "rules": [],
                    "version": "1.0.0"
                }
            }
        },
        {
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/repository_syft",
                    "linterKey": "REPOSITORY_SYFT",
                    "linterVersion": "0.65.0"
                }
            },
            "results": [],
            "tool": {
                "driver": {
                    "informationUri": "https://github.com/anchore/syft",
                    "name": "syft (MegaLinter REPOSITORY_SYFT)",
                    "rules": [],
                    "version": "0.65.0"
                }
            }
        },
        {
            "columnKind": "utf16CodeUnits",
            "originalUriBaseIds": {
                "ROOTPATH": {
                    "uri": "file:///"
                }
            },
            "properties": {
                "megalinter": {
                    "docUrl": "https://megalinter.io/6.18.0/descriptors/repository_trivy",
                    "linterKey": "REPOSITORY_TRIVY",
                    "linterVersion": "0.35.0"
                }
            },
            "results": [],
            "tool": {
                "driver": {
                    "fullName": "Trivy Vulnerability Scanner",
                    "informationUri": "https://github.com/aquasecurity/trivy",
                    "name": "Trivy (MegaLinter REPOSITORY_TRIVY)",
                    "rules": [],
                    "version": "0.35.0"
                }
            }
        }
    ],
    "version": "2.1.0"
}