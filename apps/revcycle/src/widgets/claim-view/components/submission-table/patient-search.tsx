import { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { getPatients } from '../../api.client'
import { PatientOption } from '../../types'

interface PatientSearchProps {
  onPatientSelect: (patientId: string, patientName: string) => void
  reset: boolean
}

const PatientSearch = ({ onPatientSelect, reset }: PatientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<PatientOption[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPatients = async () => {
      if (searchTerm && showSuggestions) {
        try {
          const data = await getPatients({ name: searchTerm })
          const mappedResults = data.map((patient) => ({
            id: String(patient.id),
            fullName: `${patient.legalName.firstName} ${patient.legalName.lastName}`,
          }))
          setResults(mappedResults)
        } catch (error) {
          setResults([])
        }
      } else {
        setResults([])
      }
    }

    const debounceTimeout = setTimeout(() => {
      fetchPatients() // Call the async function
    }, 300)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm, showSuggestions])

  useEffect(() => {
    if (reset) {
      setSearchTerm('')
      setResults([])
      setHighlightedIndex(-1)
      setShowSuggestions(false)
    }
  }, [reset])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        setHighlightedIndex((prevIndex) =>
          prevIndex < results.length - 1 ? prevIndex + 1 : 0,
        )
        break
      case 'ArrowUp':
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : results.length - 1,
        )
        break
      case 'Enter':
        if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          handleSelect(
            results[highlightedIndex].id,
            results[highlightedIndex].fullName,
          )
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        break
      default:
        break
    }
  }

  const handleSelect = (id: string, name: string) => {
    onPatientSelect(id, name)
    setSearchTerm(name)
    setShowSuggestions(false)
    setHighlightedIndex(-1)
  }

  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  const handleClick = (index: number, id: string, name: string) => {
    setHighlightedIndex(index)
    handleSelect(id, name)
  }

  return (
    <Flex
      direction="column"
      width="100%"
      gap="3"
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      <Flex position="relative" direction="column" gap="1">
        <Box position="relative">
          <TextField.Root
            className="h-30 text-sm p-0"
            placeholder="John Doe Smith"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={() => setShowSuggestions(false)}
          />
          <MagnifyingGlassIcon className="absolute right-3 top-2" />
        </Box>
        {results.length > 0 && showSuggestions && (
          <ul className="bg-white absolute top-full z-50 max-h-60 w-full overflow-auto rounded-2 bg-[#FFF] px-1 shadow-3">
            {results.map((patient, index) => (
              <li
                key={patient.id}
                className={`border-b border-b-gray-5 last:border-b-0 ${
                  highlightedIndex === index ? 'bg-[#00a2c7] text-[#fff]' : ''
                }`}
                onMouseDown={() =>
                  handleClick(index, patient.id, patient.fullName)
                }
              >
                <Button
                  tabIndex={0}
                  className="block w-full cursor-pointer bg-transparent px-1 text-left text-[#3e3e3e] hover:bg-[#00a2c7] hover:text-[#fff]"
                >
                  <Text size="2">{patient.fullName}</Text>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Flex>
    </Flex>
  )
}

export default PatientSearch
